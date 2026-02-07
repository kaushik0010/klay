"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeData } from "@/lib/share-utils";
import { ProposalCard } from "@/components/tambo/proposal-card";
import { MediaKit } from "@/components/tambo/media-kit";
import { QuizPanel } from "@/components/tambo/quiz-panel";
import { Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SharePage() {
  const searchParams = useSearchParams();
  const [decodedState, setDecodedState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = searchParams.get("s");
    if (s) {
      const data = decodeData(s);
      setDecodedState(data);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted/10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!decodedState) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Invalid Link</h1>
        <p className="text-muted-foreground">This content does not exist or the link is broken.</p>
        <Link href="/" className="text-primary hover:underline">Go Home</Link>
      </div>
    );
  }

  const { type, data } = decodedState;

  return (
    <div className="min-h-screen bg-muted/10 flex flex-col items-center justify-center p-4">
      {/* Shared Header */}
      <div className="mb-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold tracking-wider uppercase">Shared via Klay</span>
      </div>

      {/* The Rendered Component */}
      <div className="w-full max-w-2xl animate-in zoom-in-95 duration-500">
        {type === "ProposalCard" && <ProposalCard {...data} />}
        {type === "MediaKit" && <MediaKit {...data} />}
        {type === "QuizPanel" && <QuizPanel {...data} />}
      </div>

      {/* CTA Footer */}
      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
        >
          Build your own
        </Link>
      </div>
    </div>
  );
}