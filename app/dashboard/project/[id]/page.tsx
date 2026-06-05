'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, Users, Map, Dollar, ArrowLeft, Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';

const generators = [
  { key: 'canvas', icon: FileText, title: 'Business Canvas', desc: 'Business Model Canvas' },
  { key: 'persona', icon: Users, title: 'Buyer Persona', desc: 'Ideal customer profile' },
  { key: 'roadmap', icon: Map, title: 'Roadmap', desc: 'Execution plan' },
  { key: 'deck', icon: Dollar, title: 'Investor Deck', desc: 'Pitch deck for investors' },
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => { loadProject(); }, [params.id]);


  async function loadProject() {
    const { data } = await supabase.from('projects').select('*').eq('id', params.id).single();
    setProject(data);
    setLoading(false);
  }

  async function generate(key: string) {
    setGenerating(key);
    try {
      const res = await fetch(`/api/${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectId: params.id, 
          idea: project.idea, 
          analysis: project.analysis,
          canvas: project.business_canvas,
          persona: project.buyer_persona,
          roadmap: project.roadmap
        })
      });
      await res.json();
      loadProject();
    } catch (err) {
      alert('Failed to generate');
    } finally {
      setGenerating(null);
    }
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Hipmipreneur</h1>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Your Idea</h2>
          <p className="text-purple-300 text-lg">{project?.idea}</p>
        </motion.div>

        {project?.analysis && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" /> AI Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-purple-400 font-semibold mb-2">Summary</h4>
                <p className="text-slate-300">{project.analysis.summary}</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-2">Validation Score</h4>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-green-400">{project.analysis.validation_score}</div>
                  <span className="text-slate-500">/ 100</span>
                </div>
              </div>
              {project.analysis.market_size && (
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">Market Size</h4>
                  <p className="text-slate-300">{project.analysis.market_size}</p>
                </div>
              )}
              {project.analysis.competitors?.length > 0 && (
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">Competitors</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.analysis.competitors.map((c: string, i: number) => (
                      <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {generators.map((gen) => (
            <button 
              key={gen.key}
              onClick={() => generate(gen.key)}
              disabled={!!generating}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition-all disabled:opacity-50 text-left"
            >
              <gen.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h4 className="text-white font-semibold">{gen.title}</h4>
              <p className="text-slate-500 text-sm mt-1">
                {generating === gen.key ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                  </span>
                ) : project?.[gen.key === 'canvas' ? 'business_canvas' : gen.key === 'persona' ? 'buyer_persona' : gen.key === 'roadmap' ? 'roadmap' : 'investor_deck'] ? (
                  <span className="text-green-400">✓ Generated</span>
                ) : (
                  'Click to generate'
                )}
              </p>
            </button>
          ))}
        </motion.div>

        {project?.business_canvas && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Business Model Canvas</h3>
              <button 
                onClick={() => copyToClipboard(project.business_canvas, 'canvas')}
                className="text-slate-400 hover:text-white flex items-center gap-2 text-sm"
              >
                {copied === 'canvas' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'canvas' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(project.business_canvas).map(([key, value]: [string, any]) => (
                <div key={key} className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-purple-400 font-semibold text-sm mb-2 capitalize">{key.replace('_', ' ')}</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    {Array.isArray(value) ? value.map((v: string, i: number) => (
                      <li key={i}>• {v}</li>
                    )) : <li>{String(value)}</li>}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project?.roadmap && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Execution Roadmap</h3>
              <button 
                onClick={() => copyToClipboard(project.roadmap, 'roadmap')}
                className="text-slate-400 hover:text-white flex items-center gap-2 text-sm"
              >
                {copied === 'roadmap' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'roadmap' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="space-y-4">
              {project.roadmap.phases?.map((phase: any, i: number) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-semibold">{phase.phase}</h4>
                    <span className="text-purple-400 text-sm">{phase.duration}</span>
                  </div>
                  <div className="text-slate-400 text-sm">
                    <p className="mb-1"><span className="text-slate-500">Tasks:</span> {phase.tasks?.join(', ')}</p>
                    <p><span className="text-slate-500">Milestones:</span> {phase.milestones?.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}