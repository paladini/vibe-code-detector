import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import type { ReactElement } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Zap,
  Layout,
  Sparkles,
  Code2,
  Search,
  Shield,
  MessageSquare,
  Brain,
  FolderOpen,
  Package,
  GitCommit,
  LayoutGrid,
  CheckSquare,
  ExternalLink,
  Settings2,
  RefreshCw,
  Info,
} from 'lucide-react';
import { analyzeVibe, VibeResult } from '@/src/lib/vibe-detector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type AnalyzeResponse = VibeResult;

function toFriendlyErrorMessage(rawMessage: string): string {
  const message = rawMessage.toLowerCase();

  if (message.includes('chrome://') || message.includes('cannot access a chrome:// url')) {
    return 'This is a Chrome internal page (like New Tab). Open a regular website to run the analysis.';
  }

  if (message.includes('cannot access contents of url')) {
    return 'This page blocks extension access. Try another tab with a regular website.';
  }

  if (message.includes('receiving end does not exist')) {
    return 'Could not connect to this tab yet. Refresh the page and try Rescan.';
  }

  return 'Could not analyze this page. Try refreshing the tab and clicking Rescan.';
}

/**
 * Fallback: inject content.js into the tab (in case the content script wasn't
 * loaded yet, e.g. the tab was already open before the extension was installed),
 * then retry the message. This avoids duplicating heuristic logic here.
 */
async function analyzeByScriptInjection(tabId: number): Promise<AnalyzeResponse> {
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['content.js'],
  });

  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { action: 'analyze' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (!response) {
        reject(new Error('No response from content script after injection.'));
        return;
      }
      resolve(response as AnalyzeResponse);
    });
  });
}

async function analyzeActiveTab(): Promise<AnalyzeResponse> {
  if (!chrome?.tabs?.query) {
    return analyzeVibe(document);
  }

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];

  if (!activeTab?.id) {
    throw new Error('No active tab found.');
  }

  const url = activeTab.url || '';
  if (url.startsWith('chrome://') || url.startsWith('chrome-extension://') || url.startsWith('edge://')) {
    throw new Error('Cannot access a chrome:// URL');
  }

  try {
    return await new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(activeTab.id!, { action: 'analyze' }, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        if (!response) {
          reject(new Error('No response from content script.'));
          return;
        }
        resolve(response as AnalyzeResponse);
      });
    });
  } catch {
    return analyzeByScriptInjection(activeTab.id);
  }
}

export default function VibePopup() {
  const [result, setResult] = useState<VibeResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scoreColor = useMemo(() => {
    if (!result) return 'text-slate-300';
    if (result.score < 30) return 'text-emerald-500';
    if (result.score < 70) return 'text-amber-500';
    return 'text-rose-500';
  }, [result]);

  const scoreLabel = useMemo(() => {
    if (!result) return null;
    if (result.score < 30) return 'Human / Handcrafted';
    if (result.score < 70) return 'Hybrid / Assisted';
    return 'Vibe Coded / AI-First';
  }, [result]);

  const ScoreIcon = useMemo(() => {
    if (!result) return null;
    if (result.score < 30) return <ShieldCheck className={`w-8 h-8 ${scoreColor}`} />;
    if (result.score < 70) return <ShieldQuestion className={`w-8 h-8 ${scoreColor}`} />;
    return <ShieldAlert className={`w-8 h-8 ${scoreColor}`} />;
  }, [result, scoreColor]);

  const factorIcon = (name: string) => {
    const cls = 'w-3 h-3 text-indigo-400 shrink-0';
    const map: Record<string, ReactElement> = {
      'Tailwind & Utility DNA':    <Zap className={cls} />,
      'Shadcn/UI & Radix':         <Layout className={cls} />,
      'AI Iconography (Lucide)':   <Sparkles className={cls} />,
      'Vibe Coding Stack':         <Code2 className={cls} />,
      'AI IDE & Agent Markers':    <Search className={cls} />,
      'Platform Signatures':       <Shield className={cls} />,
      'Prompt Artifact Comments':  <MessageSquare className={cls} />,
      'Model/Provider Metadata':   <Brain className={cls} />,
      'Generic Code Structure':    <FolderOpen className={cls} />,
      'AI SDK/Dependency Clues':   <Package className={cls} />,
      'Commit/PR Metadata':        <GitCommit className={cls} />,
      'Default AI UI Patterns':    <LayoutGrid className={cls} />,
      'Consistent Formatting':     <CheckSquare className={cls} />,
      'External AI References':    <ExternalLink className={cls} />,
      'Build/CI AI Artifacts':     <Settings2 className={cls} />,
    };
    return map[name] ?? <Shield className={cls} />;
  };

  const scanPage = async () => {
    setIsScanning(true);
    setError(null);
    try {
      const scanResult = await analyzeActiveTab();
      setResult(scanResult);
    } catch (scanError) {
      const rawMessage = scanError instanceof Error ? scanError.message : 'Failed to analyze active tab.';
      setError(toFriendlyErrorMessage(rawMessage));
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    void scanPage();
  }, []);

  return (
    <div className="w-[380px] bg-slate-950 text-slate-50 font-sans border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">Vibe Code Detector</h1>
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

      <ScrollArea className="h-[480px]">
        <div className="p-4 space-y-6">
          {/* Score */}
          <div className="flex flex-col items-center justify-center py-4">
            {isScanning ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-indigo-500 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-400 animate-pulse">Analyzing heuristics...</p>
              </div>
            ) : result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="mb-2">{ScoreIcon}</div>
                <div className="text-5xl font-black tracking-tighter flex items-baseline gap-1">
                  <span className={scoreColor}>{result.score}</span>
                  <span className="text-xl text-slate-600">/100</span>
                </div>
                <Badge variant="outline" className={`${scoreColor} border-current bg-current/5 px-3 py-1`}>
                  {scoreLabel}
                </Badge>
                <p className="text-xs text-slate-400 mt-2 max-w-[250px]">
                  Probability of this site being AI-generated or heavily assisted.
                </p>
              </motion.div>
            ) : null}
          </div>

          {/* Factors */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-3 h-3" /> Detected Factors
              </h3>
              {result && (
                <span className="text-xs font-bold tabular-nums text-slate-400">
                  <span className={result.factors.filter((f) => f.detected).length > 0 ? 'text-indigo-400' : ''}>
                    {result.factors.filter((f) => f.detected).length}
                  </span>
                  <span className="text-slate-600"> / {result.factors.length}</span>
                </span>
              )}
            </div>

            {error && (
              <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-200">
                {error}
              </div>
            )}

            {!error && result && (
              <div className="grid gap-2">
                {result.factors.map((factor, idx) => (
                  <motion.div
                    key={factor.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`p-3 rounded-lg border transition-colors ${
                      factor.detected
                        ? 'bg-indigo-500/15 border-indigo-500/50'
                        : 'bg-slate-950 border-slate-800/50 opacity-30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {factorIcon(factor.name)}
                        <span className={`text-xs font-bold ${factor.detected ? 'text-indigo-200' : 'text-slate-500'}`}>
                          {factor.name}
                        </span>
                      </div>
                      {factor.detected && (
                        <Badge className="bg-indigo-500 text-[9px] h-4 px-1.5">+{factor.weight}%</Badge>
                      )}
                    </div>
                    <p className={`text-[10px] leading-relaxed ${factor.detected ? 'text-slate-300' : 'text-slate-600'}`}>
                      {factor.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer info */}
          {!error && (
            <div className="pt-2 border-t border-slate-800">
              <div className="bg-slate-900 rounded-lg p-3 flex items-start gap-3">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-400 leading-normal">
                  "Vibe Coding" refers to a development style where AI generates most of the visual and structural
                  code, resulting in highly standardized modern design patterns.
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
