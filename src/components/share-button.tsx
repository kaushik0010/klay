"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { encodeData } from "@/lib/share-utils";

interface ShareButtonProps {
  type: "ProposalCard" | "MediaKit" | "QuizPanel";
  data: any; // The props of the component
}

export function ShareButton({ type, data }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    // 1. Encode the state
    const encoded = encodeData({ type, data });
    
    // 2. Create the full URL (window.location.origin gets 'https://klay.app' or 'localhost')
    const url = `${window.location.origin}/share?s=${encoded}`;

    // 3. Copy to clipboard
    navigator.clipboard.writeText(url);

    // 4. Show success state
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-full transition-colors cursor-pointer"
      title="Copy link to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-green-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3 h-3" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}