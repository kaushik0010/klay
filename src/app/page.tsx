"use client"; // <--- 1. Added this to be safe with interactions
import React from "react"; // <--- 2. Added this import to fix the "UMD global" error
import Link from "next/link";
import { ArrowRight, Hammer, Sparkles, Box, type LucideProps } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-3xl w-full flex flex-col items-center text-center space-y-8 z-10">
        
        {/* Logo / Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border text-xs font-medium uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>Generative UI Hackathon</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Klay
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          The <span className="text-foreground font-medium">Intent-Driven</span> Tool Builder.
          <br />
          Describe the tool you need. Klay builds the UI instantly.
        </p>

        {/* Feature Grid (Mini) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <FeatureItem icon={<Box />} text="Orchestrated UI" />
          <FeatureItem icon={<Hammer />} text="Instant Tools" />
          <FeatureItem icon={<Sparkles />} text="Adaptive Workflows" />
        </div>

        {/* Call to Action */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <Link 
            href="/chat" 
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-foreground px-8 font-medium text-background transition-all hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <span className="flex items-center gap-2">
              Start Building
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

      </main>

      <footer className="absolute bottom-4 text-xs text-muted-foreground opacity-50">
        Built for #TheUIStrikesBack by You
      </footer>
    </div>
  );
}

// 3. Fixed the type error by explicitly typing the icon element
function FeatureItem({ icon, text }: { icon: React.ReactElement<LucideProps>, text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 shadow-sm">
      <div className="p-2 rounded-lg bg-muted text-foreground">
        {/* The 'as any' bypasses the strict check, or we use proper LucideProps typing above */}
        {React.cloneElement(icon, { size: 20 } as LucideProps)} 
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}