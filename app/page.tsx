'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Rocket, Users, TrendingUp, ArrowRight, Sparkles, 
  ChevronRight, CheckCircle, Loader2, Zap, Target, Dollar
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const features = [
  { icon: Brain, title: 'AI Analysis', desc: 'Deep market & competition analysis', color: 'from-purple-500 to-pink-500' },
  { icon: Target, title: 'Validation', desc: 'Validate product-market fit', color: 'from-blue-500 to-cyan-500' },
  { icon: Users, title: 'Buyer Persona', desc: 'Create ideal customer profiles', color: 'from-green-500 to-emerald-500' },
  { icon: TrendingUp, title: 'Roadmap', desc: 'Step-by-step execution plan', color: 'from-orange-500 to-red-500' },
  { icon: Dollar, title: 'Investor Deck', desc: 'Auto-generate pitch deck', color: 'from-yellow-500 to-amber-500' },
  { icon: Zap, title: 'Fast MVP', desc: 'Launch in hours, not months', color: 'from-violet-500 to-purple-500' },
];

export default function Home() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function analyzeIdea() {
    if (!idea.trim()) return;
    setLoading(true);
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      });
      
      const data = await res.json();
      
      if (data.project) {
        router.push(`/dashboard/project/${data.project.id}`);
      } else if (data.error === 'Unauthorized') {
        router.push('/auth/login');
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      alert('Failed to analyze idea');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/30 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-900/20 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <header className="relative container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Hipmipreneur</h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <a href="/dashboard" className="text-slate-400 hover:text-white transition">Dashboard</a>
            <a href="/auth/login" className="text-slate-400 hover:text-white transition">Sign In</a>
          </motion.div>
        </nav>
      </header>

      <main className="relative container mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">AI-Powered Business Builder</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Turn Your Idea Into a  
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Business
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-10">
            Validate, plan, and launch your startup in hours — not months. 
            AI does the heavy lifting.
          </p>
          
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-2 border border-slate-800">
            <div className="bg-slate-800/50 rounded-xl p-6">
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your business idea... e.g., 'AI-powered meal planning app for busy professionals'"
                className="w-full bg-transparent text-white placeholder-slate-500 text-lg p-4 h-32 resize-none focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && analyzeIdea()}
              />
              <button 
                onClick={analyzeIdea}
                disabled={loading || !idea.trim()}
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Analyze My Idea
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>


        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Everything You Need</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Open source</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}