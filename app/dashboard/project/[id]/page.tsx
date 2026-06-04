'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Brain, FileText, Users, Map, Dollar, ArrowLeft } from 'lucide-react';

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    loadProject();
  }, [params.id]);

  async function loadProject() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .single();
    setProject(data);
    setLoading(false);
  }

  async function generateCanvas() {
    setGenerating('canvas');
    await fetch('/api/canvas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: params.id, idea: project.idea, analysis: project.analysis })
    });
    loadProject();
    setGenerating(null);
  }

  async function generatePersona() {
    setGenerating('persona');
    await fetch('/api/persona', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: params.id, idea: project.idea, analysis: project.analysis })
    });
    loadProject();
    setGenerating(null);
  }

  async function generateRoadmap() {
    setGenerating('roadmap');
    await fetch('/api/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: params.id, idea: project.idea, analysis: project.analysis })
    });
    loadProject();
    setGenerating(null);
  }

  async function generateDeck() {
    setGenerating('deck');
    const res = await fetch('/api/deck', {
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
    const data = await res.json();
    setProject({ ...project, investor_deck: data.deck });
    setGenerating(null);
  }

  if (loading) return <div className="min-h-screen bg-slate-900 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.push('/dashboard')} className="text-slate-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-white">Hipmipreneur</h1>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Your Idea</h2>
          <p className="text-purple-300 text-lg">{project?.idea}</p>
        </div>

        {project?.analysis && (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
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
                <div className="text-4xl font-bold text-green-400">{project.analysis.validation_score}/100</div>
              </div>
            </div>
          </div>
        )}


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button onClick={generateCanvas} disabled={!!generating} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-purple-500 transition disabled:opacity-50">
            <FileText className="w-10 h-10 text-purple-400 mb-4" />
            <h4 className="text-white font-semibold">Business Canvas</h4>
            <p className="text-slate-400 text-sm mt-2">{project?.business_canvas ? '✓ Generated' : 'Click to generate'}</p>
          </button>
          
          <button onClick={generatePersona} disabled={!!generating} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-purple-500 transition disabled:opacity-50">
            <Users className="w-10 h-10 text-purple-400 mb-4" />
            <h4 className="text-white font-semibold">Buyer Persona</h4>
            <p className="text-slate-400 text-sm mt-2">{project?.buyer_persona ? '✓ Generated' : 'Click to generate'}</p>
          </button>
          
          <button onClick={generateRoadmap} disabled={!!generating} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-purple-500 transition disabled:opacity-50">
            <Map className="w-10 h-10 text-purple-400 mb-4" />
            <h4 className="text-white font-semibold">Roadmap</h4>
            <p className="text-slate-400 text-sm mt-2">{project?.roadmap ? '✓ Generated' : 'Click to generate'}</p>
          </button>
          
          <button onClick={generateDeck} disabled={!!generating} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-purple-500 transition disabled:opacity-50">
            <Dollar className="w-10 h-10 text-purple-400 mb-4" />
            <h4 className="text-white font-semibold">Investor Deck</h4>
            <p className="text-slate-400 text-sm mt-2">{project?.investor_deck ? '✓ Generated' : 'Click to generate'}</p>
          </button>
        </div>

        {project?.business_canvas && (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Business Model Canvas</h3>
            <pre className="text-slate-300 text-sm overflow-auto">{JSON.stringify(project.business_canvas, null, 2)}</pre>
          </div>
        )}

        {project?.roadmap && (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Execution Roadmap</h3>
            <pre className="text-slate-300 text-sm overflow-auto">{JSON.stringify(project.roadmap, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}