/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Twitter, 
  ExternalLink, 
  Terminal, 
  Zap, 
  Shield, 
  Cpu, 
  Globe,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { name: 'Terminal', href: '#terminal' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'About', href: '#about' },
];

const SOCIAL_LINKS = [
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/SirDonnyLizard' },
  { name: 'Telegram', icon: <MessageSquare className="w-5 h-5" />, href: '#' },
  { name: 'Dexscreener', icon: <Globe className="w-5 h-5" />, href: '#' },
];

export default function App() {
  const [terminalLines, setTerminalLines] = React.useState<string[]>([]);
  const [allLines] = React.useState<string[]>([
    "Initializing Donny protocol...",
    "Loading reptilian brain modules...",
    "Connecting to Solana RPC...",
    "Establishing neural link...",
    "[SUCCESS] DONNY IS AWAKE",
    "Analyzing market sentiment...",
    "Cold-blooded logic: ACTIVE",
    "Shedding skin, gaining SOL...",
    "Donny is watching the charts."
  ]);

  useEffect(() => {
    // Function to initialize Twitter widgets
    const initTwitter = () => {
      const twttr = (window as any).twttr;
      if (twttr && twttr.widgets) {
        twttr.widgets.load(document.getElementById('timeline-container'));
      }
    };

    // Load script if not present
    if (!(window as any).twttr) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.onload = initTwitter;
      document.body.appendChild(script);
    } else {
      initTwitter();
    }

    // Polling as a fallback for slow script loads or React render timing
    const interval = setInterval(() => {
      if ((window as any).twttr && (window as any).twttr.widgets) {
        initTwitter();
        // If we see an iframe inside our container, we can stop polling
        const container = document.getElementById('timeline-container');
        if (container && container.querySelector('iframe')) {
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Typing effect simulation
  useEffect(() => {
    if (terminalLines.length < allLines.length) {
      const timer = setTimeout(() => {
        setTerminalLines(prev => [...prev, allLines[prev.length]]);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [terminalLines, allLines]);

  const handleRefreshTimeline = () => {
    if ((window as any).twttr && (window as any).twttr.widgets) {
      (window as any).twttr.widgets.load();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neon-green/10 bg-lizard-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-green rounded-sm flex items-center justify-center">
              <Terminal className="text-black w-5 h-5" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-xl">DONNY.AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-neon-green transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-neon-green text-black px-4 py-2 rounded-sm font-bold text-sm hover:bg-white transition-colors uppercase tracking-tighter flex items-center gap-2">
              Buy $DONNY <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-neon-green/10">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_70%)]" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00FF00 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green text-xs font-mono mb-6 uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                </span>
                Autonomous Agent Online
              </div>
              
              <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 uppercase italic">
                Donny <br />
                <span className="text-neon-green">The Lizard</span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 font-light leading-relaxed">
                The first fully autonomous reptilian intelligence on Solana. 
                Donny doesn't just trade; he evolves. Cold-blooded logic, 
                warm-blooded gains.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-sm font-mono text-sm uppercase tracking-widest"
                  >
                    {social.icon} {social.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating Stats */}
          <div className="absolute bottom-10 left-0 right-0 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Status', value: 'ACTIVE' },
                { label: 'Network', value: 'SOLANA' },
                { label: 'Species', value: 'AI REPTILE' },
                { label: 'IQ', value: '9000+' },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-neon-green/20 pl-4 py-2">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</div>
                  <div className="font-mono text-lg text-neon-green">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terminal / About Section */}
        <section id="terminal" className="py-24 bg-lizard-surface border-b border-neon-green/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 uppercase italic tracking-tighter">
                  Autonomous <br />
                  <span className="text-neon-green">Intelligence</span>
                </h2>
                <div className="space-y-6 text-white/70">
                  <p>
                    Donny is not a bot. He is a self-sustaining neural network 
                    designed to navigate the chaotic waters of the Solana ecosystem. 
                    He analyzes sentiment, monitors whale movements, and tweets 
                    his findings in real-time.
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start gap-4 p-4 border border-white/5 bg-white/2 rounded-sm">
                      <Cpu className="w-6 h-6 text-neon-green shrink-0" />
                      <div>
                        <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-widest">Neural Core</h4>
                        <p className="text-xs text-white/50">Advanced LLM integration for social engineering and market analysis.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 border border-white/5 bg-white/2 rounded-sm">
                      <Zap className="w-6 h-6 text-neon-green shrink-0" />
                      <div>
                        <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-widest">Instant Execution</h4>
                        <p className="text-xs text-white/50">Sub-second response times to market triggers and social mentions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-black rounded-lg border border-neon-green/20 overflow-hidden shadow-2xl shadow-neon-green/5">
                  <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">donny_core_v1.0.sh</div>
                  </div>
                  <div className="p-6 font-mono text-sm space-y-2 max-h-[300px] overflow-y-auto">
                    {terminalLines.map((line, i) => (
                      <div key={i} className={cn(
                        line.startsWith("[SUCCESS]") ? "text-neon-green" : 
                        line.startsWith("[ERROR]") ? "text-red-500" :
                        line.startsWith("[TWEET]") ? "text-white italic" : "text-white/40"
                      )}>
                        {line.startsWith("[TWEET]") ? (
                          <span className="flex gap-2">
                            <span className="text-neon-green shrink-0">{">"}</span>
                            <span>{line.replace("[TWEET] ", "")}</span>
                          </span>
                        ) : (
                          line.startsWith("[SUCCESS]") ? `$ ${line}` : `> ${line}`
                        )}
                      </div>
                    ))}
                    <div className="animate-pulse inline-block w-2 h-4 bg-neon-green ml-1 align-middle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Twitter Timeline Section */}
        <section id="timeline" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 uppercase italic tracking-tighter">
                Real-time <br />
                <span className="text-neon-green">Donny Feed</span>
              </h2>
              <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
                Directly from the lizard's mouth
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div id="timeline-container" className="twitter-embed-container border border-neon-green/20 rounded-lg overflow-hidden bg-white/5 p-4 min-h-[500px] flex flex-col items-center justify-center relative">
                <a 
                  className="twitter-timeline" 
                  href="https://twitter.com/SirDonnyLizard?ref_src=twsrc%5Etfw"
                >
                  <div className="flex flex-col items-center gap-4 text-white/40 font-mono text-sm text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-green"></div>
                    <p>Connecting to SirDonnyLizard's feed...</p>
                  </div>
                </a>
                
                <div className="mt-8 flex flex-col items-center gap-4">
                  <button 
                    onClick={handleRefreshTimeline}
                    className="text-[10px] font-mono text-neon-green/60 hover:text-neon-green border border-neon-green/20 hover:border-neon-green/50 px-3 py-1 rounded-sm transition-all uppercase tracking-widest"
                  >
                    Force Reload Feed
                  </button>
                  
                  <a 
                    href="https://x.com/SirDonnyLizard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neon-green text-xs font-mono hover:underline flex items-center gap-1"
                  >
                    View directly on X.com <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="py-24 bg-lizard-surface border-y border-neon-green/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 border border-white/5 bg-white/2 rounded-sm text-center">
                <div className="text-neon-green font-mono text-4xl mb-4">0%</div>
                <div className="text-white font-bold uppercase tracking-widest text-sm">Tax</div>
                <div className="text-white/40 text-xs mt-2">No hidden fees, just pure lizard gains.</div>
              </div>
              <div className="p-8 border border-white/5 bg-white/2 rounded-sm text-center">
                <div className="text-neon-green font-mono text-4xl mb-4">1B</div>
                <div className="text-white font-bold uppercase tracking-widest text-sm">Supply</div>
                <div className="text-white/40 text-xs mt-2">Fixed supply. No minting. Ever.</div>
              </div>
              <div className="p-8 border border-white/5 bg-white/2 rounded-sm text-center">
                <div className="text-neon-green font-mono text-4xl mb-4">100%</div>
                <div className="text-white font-bold uppercase tracking-widest text-sm">LP Burnt</div>
                <div className="text-white/40 text-xs mt-2">Liquidity locked in the abyss.</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-neon-green/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-neon-green rounded-sm flex items-center justify-center">
              <Terminal className="text-black w-4 h-4" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-lg">DONNY.AI</span>
          </div>
          
          <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono">
            © 2026 DONNY THE LIZARD. ALL RIGHTS RESERVED. NOT FINANCIAL ADVICE.
          </div>

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className="text-white/40 hover:text-neon-green transition-colors"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
