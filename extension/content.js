/**
 * Content Script for VibeCheck
 * Runs in the context of the web page.
 */

function analyzeVibe() {
  const factors = [
    { name: "Tailwind & Utility DNA", weight: 15, detected: false },
    { name: "Shadcn/UI & Radix", weight: 15, detected: false },
    { name: "AI Iconography (Lucide)", weight: 10, detected: false },
    { name: "Vibe Coding Stack", weight: 15, detected: false },
    { name: "AI IDE & Agent Markers", weight: 25, detected: false },
    { name: "Platform Signatures", weight: 20, detected: false },
  ];

  const html = document.documentElement.innerHTML;
  const bodyText = document.body.innerText;

  // 1. Tailwind Density
  const allElements = document.querySelectorAll('*');
  let classCount = 0;
  allElements.forEach(el => {
    if (el.className && typeof el.className === 'string') {
      classCount += el.className.split(' ').length;
    }
  });
  const density = classCount / (allElements.length || 1);
  factors[0].detected = density > 4.5 || html.includes('tw-');

  // 2. Shadcn & Radix
  const shadcnMarkers = ['bg-background', 'text-foreground', 'data-radix-', 'data-state=', 'rounded-xl', 'border-input'];
  factors[1].detected = shadcnMarkers.filter(m => html.includes(m)).length >= 3;

  // 3. Lucide
  factors[2].detected = html.includes('lucide') || !!document.querySelector('svg[class*="lucide"]');

  // 4. Vibe Stack
  const hasMotion = html.includes('framer-motion') || html.includes('motion-');
  factors[3].detected = hasMotion && (factors[2].detected || factors[0].detected);

  // 5. IDE Markers
  const ideMarkers = ['cursor-ignore', '__cursor', 'windsurf', 'trae-ide', 'replit-code-editor', 'devin-ai', 'claude-code'];
  const hasIDEMarker = ideMarkers.some(m => html.toLowerCase().includes(m));
  factors[4].detected = hasIDEMarker;

  // 6. Platform Signatures
  const metaGenerator = document.querySelector('meta[name="generator"]')?.getAttribute('content')?.toLowerCase() || '';
  const isAIStudio = html.includes('metadata.json') || html.includes('SPDX-License-Identifier: Apache-2.0');
  const isLovable = html.includes('lovable') || html.includes('gptengineer');
  const isBolt = html.includes('bolt.new') || html.includes('stackblitz');
  const isV0 = html.includes('v0.dev') || metaGenerator.includes('v0');
  const isReplit = html.includes('replit.app') || html.includes('replit-agent');
  factors[5].detected = isAIStudio || isLovable || isBolt || isV0 || isReplit;

  let score = 0;
  factors.forEach(f => { if (f.detected) score += f.weight; });
  if (isAIStudio || isV0 || isLovable || isReplit || hasIDEMarker) score = Math.max(90, score);

  return { score: Math.min(100, score), factors };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze") {
    sendResponse(analyzeVibe());
  }
  return true;
});
