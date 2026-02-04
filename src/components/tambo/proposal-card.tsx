"use client";

import { cn } from "@/lib/utils";
import { useTamboComponentState } from "@tambo-ai/react";
import confetti from "canvas-confetti";
import { Check, FileSignature, Calendar, DollarSign, Briefcase } from "lucide-react";
import * as React from "react";
import { z } from "zod";

// 1. The Zod Schema (What the AI fills in)
export const proposalCardSchema = z.object({
  title: z.string().describe("The project name (e.g. 'E-commerce Website Redesign')"),
  clientName: z.string().optional().describe("Name of the client or company"),
  budget: z.string().describe("Total project cost (e.g. '$2,500' or '₹50,000')"),
  dueDate: z.string().optional().describe("Expected completion date"),
  deliverables: z.array(z.string()).describe("List of 3-5 key deliverables included in this proposal"),
});

// 2. Types
export type ProposalCardProps = z.infer<typeof proposalCardSchema> & React.HTMLAttributes<HTMLDivElement>;

type ProposalState = {
  status: "pending" | "accepted";
  signedAt: string | null;
};

// 3. The Component
export const ProposalCard = React.forwardRef<HTMLDivElement, ProposalCardProps>(
  ({ title, clientName, budget, dueDate, deliverables, className, ...props }, ref) => {
    
    // Persistent State: Remembers if the user clicked "Accept"
    const [state, setState] = useTamboComponentState<ProposalState>(
      `proposal-${title.replace(/\s/g, '-')}`, 
      { status: "pending", signedAt: null }
    );

    // Hydration check
    if (!state) return null;

    const handleAccept = () => {
        // 1. Update State
        setState({
            status: "accepted",
            signedAt: new Date().toLocaleDateString(),
        });

        // 2. Fire Confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
            return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const isAccepted = state.status === "accepted";

    return (
      <div 
        ref={ref} 
        className={cn(
          "w-full max-w-lg bg-card border rounded-xl overflow-hidden shadow-sm transition-all duration-500", 
          isAccepted ? "border-green-500/50 shadow-green-500/10" : "border-border",
          className
        )} 
        {...props}
      >
        {/* Header */}
        <div className={cn(
          "px-6 py-5 border-b flex justify-between items-start transition-colors duration-500",
          isAccepted ? "bg-green-50/50 dark:bg-green-900/10" : "bg-muted/30"
        )}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Proposal</span>
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            {clientName && <p className="text-sm text-muted-foreground mt-1">For: {clientName}</p>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{budget}</div>
            <div className="text-xs text-muted-foreground">Total Budget</div>
          </div>
        </div>

        {/* Deliverables List */}
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Deliverables</h4>
            <ul className="space-y-2">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className={cn("w-4 h-4 mt-0.5", isAccepted ? "text-green-500" : "text-muted-foreground")} />
                  <span className={isAccepted ? "text-foreground" : ""}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metadata Grid */}
          {dueDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span>Target Delivery: <span className="font-medium text-foreground">{dueDate}</span></span>
            </div>
          )}

          {/* Action Area */}
          <div className="pt-2">
            {isAccepted ? (
              <div className="border-2 border-dashed border-green-500/30 bg-green-50/30 dark:bg-green-900/10 rounded-lg p-4 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                  <FileSignature className="w-5 h-5" />
                  <span>SIGNED & ACCEPTED</span>
                </div>
                <p className="text-xs text-green-600/80 mt-1">
                  Agreement locked on {state.signedAt}
                </p>
              </div>
            ) : (
              <button
                onClick={handleAccept}
                className="group relative w-full flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 font-medium py-3 rounded-lg transition-all active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Accept Proposal <DollarSign className="w-4 h-4" />
                </span>
                {/* Subtle sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProposalCard.displayName = "ProposalCard";