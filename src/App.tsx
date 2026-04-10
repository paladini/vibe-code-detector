import VibePopup from "./components/VibePopup";
import { Globe, Shield, Search, Lock, Code2, FileJson, FileCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function App() {
  const manifestCode = `{
  "manifest_version": 3,
  "name": "VibeCheck: AI Site Detector",
  "version": "1.0",
  "permissions": ["activeTab", "scripting"],
  "action": { "default_popup": "popup.html" },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }]
}`;

  const contentCode = `function analyzeVibe() {
  const factors = [
    { name: "Tailwind CSS", weight: 20, detected: false },
    { name: "Shadcn/UI Patterns", weight: 25, detected: false },
    { name: "Lucide Icons", weight: 15, detected: false },
    // ... more heuristics
  ];
  // Logic to scan DOM and CSS...
  return { score, factors };
}`;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8 font-sans selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center max-w-7xl w-full">
        {/* Left Side: Info */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wider uppercase">
              <Shield className="w-3 h-3" /> Extension Simulator
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
        </div>

        {/* Right Side: Simulator & Source */}
        <div className="relative group w-full lg:w-auto">
          <Tabs defaultValue="preview" className="w-full lg:w-[450px]">
            <TabsList className="grid w-full grid-cols-2 bg-slate-900 border border-slate-800">
              <TabsTrigger value="preview" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <Globe className="w-3.5 h-3.5 mr-2" /> Preview
              </TabsTrigger>
              <TabsTrigger value="source" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <Code2 className="w-3.5 h-3.5 mr-2" /> Source
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              {/* Browser Window Mockup */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                {/* Browser Header */}
                <div className="h-10 bg-slate-800/50 border-b border-slate-800 flex items-center px-4 gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="flex-1 h-6 bg-slate-950 rounded-md flex items-center px-3 gap-2">
                    <Lock className="w-2.5 h-2.5 text-slate-600" />
                    <span className="text-[10px] text-slate-500 font-mono">https://v0.dev/chat/vibe-check</span>
                  </div>
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Browser Content (The Extension Popup) */}
                <div className="p-5 flex justify-center bg-slate-950/50 relative min-h-[520px]">
                  <div className="absolute top-0 right-5 z-20">
                    <VibePopup />
                  </div>

                  {/* Mock Page Content */}
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
                </div>
              </div>
            </TabsContent>

            <TabsContent value="source" className="mt-4">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden h-[560px] flex flex-col">
                <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Extension Files</span>
                  <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-500">Manifest V3</Badge>
                </div>
                <ScrollArea className="flex-1 p-4 font-mono text-[11px]">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-indigo-400 mb-2">
                        <FileJson className="w-4 h-4" />
                        <span className="font-bold">manifest.json</span>
                      </div>
                      <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto">
                        {manifestCode}
                      </pre>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <FileCode className="w-4 h-4" />
                        <span className="font-bold">content.js</span>
                      </div>
                      <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto">
                        {contentCode}
                      </pre>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>

          {/* Floating Label */}
          <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-indigo-400/30 z-30">
            SIMULATOR ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}


