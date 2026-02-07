// app/page.tsx
"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Hammer, Sparkles, Box, Zap, Rocket, ChevronRight } from "lucide-react";

export default function Home() {
  const currentYear = new Date().getFullYear().toString();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE3B3]/10 via-white to-white flex flex-col">
      {/* Premium Navigation - Updated with sticky and glassmorphism */}
      <header className="w-full py-4 sm:py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 rounded-2xl sm:rounded-3xl" />
            
            {/* Navigation content */}
            <div className="relative z-10 flex items-center justify-between p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#CA2851] to-[#FF6766] flex items-center justify-center shadow-lg shadow-[#FF6766]/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#CA2851] to-[#FF6766] bg-clip-text text-transparent">
                  Klay
                </span>
              </div>
              
              <nav className="hidden md:flex items-center gap-8">
                {["Product", "Solutions", "Pricing", "Resources"].map((item) => (
                  <button 
                    key={item} 
                    className="text-gray-600 hover:text-[#CA2851] text-sm font-medium transition-colors duration-200 cursor-pointer relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CA2851] to-[#FF6766] group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </nav>
              
              <div className="flex items-center gap-4">
                <button className="hidden md:inline-flex text-sm font-medium text-gray-600 hover:text-[#CA2851] transition-colors duration-200 cursor-pointer">
                  Sign In
                </button>
                <Link 
                  href="/chat" 
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#CA2851] to-[#FF6766] px-6 text-sm font-semibold text-white shadow-lg shadow-[#FF6766]/20 hover:shadow-xl hover:shadow-[#FF6766]/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                  {/* Shine effect on hover */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="relative py-16 lg:py-20">
            {/* Background Elements */}
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-[#FF6766]/10 to-[#FFB173]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-[#CA2851]/5 to-[#FF6766]/5 rounded-full blur-3xl" />
            
            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFE3B3] to-[#FFB173] mb-8 animate-in fade-in duration-700 shadow-lg shadow-[#FFB173]/20">
                <Sparkles className="w-4 h-4 text-[#CA2851]" />
                <span className="text-sm font-semibold text-[#CA2851]">Intent-Driven Tool Builder</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Build Tools With
                <span className="block mt-2 bg-gradient-to-r from-[#CA2851] via-[#FF6766] to-[#FFB173] bg-clip-text text-transparent">
                  Just Your Words
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Describe the tool you need in plain English. Klay generates the complete UI instantly.
                No coding, no design skills required.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link 
                  href="/chat" 
                  className="group inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-[#CA2851] to-[#FF6766] px-8 text-base font-semibold text-white shadow-xl shadow-[#FF6766]/25 hover:shadow-2xl hover:shadow-[#FF6766]/35 transition-all duration-300 cursor-pointer hover:scale-[1.02] w-full sm:w-auto relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Building Free
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Shine effect */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                </Link>
                <button className="inline-flex h-14 items-center justify-center rounded-xl bg-white border border-gray-200 px-8 text-base font-medium text-gray-700 hover:border-[#FF6766] hover:text-[#CA2851] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md w-full sm:w-auto group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <Rocket className="mr-3 w-5 h-5" />
                    Watch Demo
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FFE3B3]/0 via-[#FFE3B3]/10 to-[#FFE3B3]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { value: "3", label: "Intelligent Modes" },
                  { value: "< 2s", label: "Generation Speed" },
                  { value: "Zero", label: "Config Required" },
                  { value: "Beta", label: "Early Access" },
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  >
                    <div className="text-2xl font-bold text-[#CA2851]">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid - UPDATED: Focused on Value Proposition */}
          <div className="py-16 lg:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Experience the <span className="text-[#CA2851]">Future of Interface</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Skip the boilerplate. Klay transforms your high-level intent into working, interactive components instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: <Hammer className="w-6 h-6" />,
                  title: "Instant Tools",
                  description: "Go from idea to interactive prototype in seconds. Test and iterate faster than ever before.",
                  color: "from-[#FF6766] to-[#FFB173]",
                },
                {
                  icon: <Box className="w-6 h-6" />,
                  title: "Orchestrated UI",
                  description: "Access specialized agents that adapt to your brand, from contracts to media kits.",
                  color: "from-[#CA2851] to-[#FFB173]",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Adaptive Workflows",
                  description: "Klay understands context. It switches from Creator mode to Student mode seamlessly.",
                  color: "from-[#CA2851] to-[#FFE3B3]",
                },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-[#FF6766]/30 relative overflow-hidden"
                >
                  {/* Glassmorphism background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm -z-10" />
                  
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <button className="inline-flex items-center text-sm font-medium text-[#CA2851] hover:text-[#FF6766] cursor-pointer group-hover:gap-2 transition-all">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#CA2851] to-[#FF6766] flex items-center justify-center shadow-lg shadow-[#FF6766]/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-[#CA2851] to-[#FF6766] bg-clip-text text-transparent">
                Klay
              </span>
              <span className="text-sm text-gray-500 ml-2">© {currentYear}</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <button className="hover:text-[#CA2851] transition-colors duration-200 cursor-pointer relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CA2851] to-[#FF6766] group-hover:w-full transition-all duration-300" />
              </button>
              <button className="hover:text-[#CA2851] transition-colors duration-200 cursor-pointer relative group">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CA2851] to-[#FF6766] group-hover:w-full transition-all duration-300" />
              </button>
              <button className="hover:text-[#CA2851] transition-colors duration-200 cursor-pointer relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CA2851] to-[#FF6766] group-hover:w-full transition-all duration-300" />
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              Built with ❤️ for the future of UI development
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Item Component
function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="p-3 rounded-lg bg-gradient-to-br from-[#FFE3B3] to-[#FFB173] text-[#CA2851] group-hover:scale-110 transition-transform shadow-lg">
        {icon}
      </div>
      <span className="text-sm font-semibold text-gray-900">{text}</span>
    </div>
  );
}