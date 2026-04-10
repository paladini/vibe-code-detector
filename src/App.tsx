import VibePopup from "./components/VibePopup";
import { Globe, Shield, Search, Lock, Github } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3 h-3" /> Extension Live Preview
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.9]">
              Vibe Code Detector: <span className="text-indigo-500">Forensic analysis for the AI web.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              The ultimate open-source radar for unmasking <strong>Vibe Coding</strong>. Instantly identify the DNA of Cursor, Windsurf, Lovable, v0, and the entire AI-first ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-white font-bold text-sm">Real-time Analysis</h3>
              <p className="text-slate-500 text-xs">Instantly scans the DOM and CSS of the active page.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-white font-bold text-sm">Advanced Heuristics</h3>
              <p className="text-slate-500 text-xs">Identifies Tailwind, Shadcn, Lucide, and prompt patterns.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <a 
              href="https://github.com/paladini" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-800 group-hover:border-indigo-500 transition-colors">
                <img 
                  src="https://github.com/paladini.png" 
                  alt="Fernando Paladini" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Created by</p>
                <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Fernando Paladini</p>
              </div>
            </a>
            <div className="h-8 w-px bg-slate-800" />
            <a 
              href="https://github.com/paladini/vibe-code-detector" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">View on GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Content - Browser Mockup */}
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            {/* Browser Header */}
            <div className="bg-slate-800/50 p-3 flex items-center gap-4 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <div className="flex-1 bg-slate-950 rounded-md px-3 py-1 text-[10px] text-slate-500 font-mono flex items-center gap-2 border border-slate-800">
                <Lock className="w-2.5 h-2.5 text-slate-600" /> https://v0.dev/chat/vibe-check
              </div>
            </div>

            {/* Browser Content */}
            <div className="relative aspect-video bg-slate-950 overflow-hidden flex items-center justify-center p-8 min-h-[520px]">
              {/* Mock Website Content */}
              <div className="w-full space-y-4 opacity-10 pointer-events-none">
                <div className="h-8 w-1/3 bg-slate-800 rounded" />
                <div className="h-32 w-full bg-slate-800 rounded" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-slate-800 rounded" />
                  <div className="h-20 bg-slate-800 rounded" />
                  <div className="h-20 bg-slate-800 rounded" />
                </div>
                <div className="h-40 w-full bg-slate-800 rounded" />
              </div>

              {/* The Extension Popup Overlay */}
              <div className="absolute top-4 right-4 z-20">
                <VibePopup />
              </div>
            </div>
          </div>

          {/* Floating Label */}
          <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-indigo-400/30 z-30">
            LIVE PREVIEW
          </div>
        </div>
      </div>
    </div>
  );
}


