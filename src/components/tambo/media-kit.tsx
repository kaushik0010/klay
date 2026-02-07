"use client";

import { cn } from "@/lib/utils";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  TrendingUp, 
  Users, 
  Mail 
} from "lucide-react";
import * as React from "react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { z } from "zod";
import { ShareButton } from "@/components/share-button"; // <--- IMPORT ADDED

// 1. Zod Schema
export const mediaKitSchema = z.object({
  name: z.string().describe("Creator's full name"),
  handle: z.string().describe("Social media handle (e.g. @kaushikp010)"),
  bio: z.string().describe("Short punchy bio describing the niche"),
  platform: z.enum(["Instagram", "YouTube", "Twitter", "LinkedIn"]).describe("Primary platform"),
  stats: z.object({
    followers: z.string().describe("Total follower count (e.g. '125K')"),
    engagement: z.string().describe("Engagement rate (e.g. '4.5%')"),
    impressions: z.string().describe("Monthly impressions (e.g. '1.2M')"),
  }),
  growthData: z.array(
    z.object({
      month: z.string(),
      followers: z.number(),
    })
  ).describe("Array of last 6 months growth data"),
});

// 2. Types
export type MediaKitProps = z.infer<typeof mediaKitSchema> & React.HTMLAttributes<HTMLDivElement>;

// 3. Component
export const MediaKit = React.forwardRef<HTMLDivElement, MediaKitProps>(
  ({ name, handle, bio, platform, stats, growthData, className, ...props }, ref) => {
    
    const PlatformIcon = {
      Instagram: Instagram,
      YouTube: Youtube,
      Twitter: Twitter,
      LinkedIn: Linkedin,
    }[platform] || Users;

    return (
      <div 
        ref={ref} 
        className={cn("w-full max-w-2xl bg-card border rounded-2xl overflow-hidden shadow-sm", className)} 
        {...props}
      >
        {/* Header / Banner */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/50">
                <span className="text-2xl font-bold">{name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{name}</h2>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <PlatformIcon className="w-3 h-3" />
                  <span>{handle}</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium border border-white/30">
              Media Kit 2026
            </div>
          </div>
          <p className="mt-4 text-white/90 max-w-md text-sm leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 divide-x border-b">
          <StatBox label="Followers" value={stats.followers} />
          <StatBox label="Engagement" value={stats.engagement} />
          <StatBox label="Impressions" value={stats.impressions} />
        </div>

        {/* Growth Chart */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Audience Growth</h3>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fill: '#9CA3AF'}} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorFollowers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer CTA & Share */}
        <div className="p-4 bg-muted/20 border-t flex justify-between items-center">
            <div className="flex items-center gap-3">
                 <span className="text-xs text-muted-foreground hidden sm:inline">Available for sponsorships</span>
                 {/* SHARE BUTTON ADDED HERE */}
                 <ShareButton 
                    type="MediaKit" 
                    data={{ name, handle, bio, platform, stats, growthData }} 
                 />
            </div>

            <a 
                href={`mailto:contact@${handle.replace('@', '')}.com`}
                className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
                <Mail className="w-4 h-4" /> Contact Me
            </a>
        </div>
      </div>
    );
  }
);

function StatBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-4 text-center">
      <div className="text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{label}</div>
    </div>
  );
}

MediaKit.displayName = "MediaKit";