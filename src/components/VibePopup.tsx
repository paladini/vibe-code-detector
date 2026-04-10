import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  ShieldQuestion, 
  Shield,
  Info, 
  Zap, 
  Layout, 
  Type, 
  Code2, 
  Sparkles,
  ExternalLink,
  Github,
  RefreshCw
} from "lucide-react";
import { analyzeVibe, VibeResult } from "@/src/lib/vibe-detector";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function VibePopup() {
  const [result, setResult] = useState<VibeResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanPage = () => {
    setIsScanning(true);
    // Simular um delay de análise
    setTimeout(() => {
      const scanResult = analyzeVibe(document);
      setResult(scanResult);
      setIsScanning(false);
    }, 1500);
  };

  useEffect(() => {
    scanPage();
  }, []);

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-emerald-500";
    if (score < 70) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreLabel = (score: number) => {
    if (score < 30) return "Humano / Artesanal";
    if (score < 70) return "Híbrido / Assistido";
    return "Vibe Coded / AI-First";
  };

  const getScoreIcon = (score: number) => {
    if (score < 30) return <ShieldCheck className="w-8 h-8 text-emerald-500" />;
    if (score < 70) return <ShieldQuestion className="w-8 h-8 text-amber-500" />;
    return <ShieldAlert className="w-8 h-8 text-rose-500" />;
  };

  return (
    <div className="w-[380px] bg-slate-950 text-slate-50 font-sans overflow-hidden border border-slate-800 rounded-xl shadow-2xl">
      {/* Header */}
      <div className="p-4 border-bottom border-slate-800 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">VibeCheck</h1>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">AI Detector v1.0</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={scanPage} 
          disabled={isScanning}
          className="hover:bg-slate-800 text-slate-400"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <ScrollArea className="h-[450px]">
        <div className="p-4 space-y-6">
          {/* Score Section */}
          <div className="flex flex-col items-center justify-center py-4 relative">
            <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-indigo-500 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-400 animate-pulse">Analisando heurísticas...</p>
                </motion.div>
              ) : result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div className="mb-2">{getScoreIcon(result.score)}</div>
                  <div className="text-5xl font-black tracking-tighter flex items-baseline gap-1">
                    <span className={getScoreColor(result.score)}>{result.score}</span>
                    <span className="text-xl text-slate-600">/100</span>
                  </div>
                  <Badge variant="outline" className={`${getScoreColor(result.score)} border-current bg-current/5 px-3 py-1`}>
                    {getScoreLabel(result.score)}
                  </Badge>
                  <p className="text-xs text-slate-400 mt-2 max-w-[250px]">
                    Probabilidade deste site ter sido gerado ou fortemente assistido por IA.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Factors Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-3 h-3" /> Fatores Detectados
            </h3>
            
            <div className="grid gap-2">
              {result?.factors.map((factor, idx) => (
                <motion.div 
                  key={factor.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-3 rounded-lg border transition-colors ${
                    factor.detected 
                      ? 'bg-indigo-500/10 border-indigo-500/30' 
                      : 'bg-slate-900/50 border-slate-800 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {factor.name === "Tailwind & Utility DNA" && <Zap className="w-3 h-3 text-indigo-400" />}
                      {factor.name === "Shadcn/UI & Radix" && <Layout className="w-3 h-3 text-indigo-400" />}
                      {factor.name === "AI Iconography (Lucide)" && <Sparkles className="w-3 h-3 text-indigo-400" />}
                      {factor.name === "Vibe Coding Stack" && <Code2 className="w-3 h-3 text-indigo-400" />}
                      {factor.name === "AI IDE & Agent Markers" && <Search className="w-3 h-3 text-indigo-400" />}
                      {factor.name === "Platform Signatures" && <Shield className="w-3 h-3 text-indigo-400" />}
                      <span className="text-xs font-bold">{factor.name}</span>
                    </div>
                    {factor.detected && (
                      <Badge className="bg-indigo-500 text-[9px] h-4 px-1.5">+{factor.weight}%</Badge>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {factor.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-slate-800">
            <div className="bg-slate-900 rounded-lg p-3 flex items-start gap-3">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 leading-normal">
                O "Vibe Coding" refere-se ao estilo de desenvolvimento onde a IA gera a maior parte do código visual e estrutural, resultando em padrões de design modernos e altamente padronizados.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Action Bar */}
      <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-500 hover:text-slate-300">
            <Github className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-500 hover:text-slate-300">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[9px] text-slate-600 font-mono">MANIFEST V3 COMPLIANT</p>
      </div>
    </div>
  );
}
