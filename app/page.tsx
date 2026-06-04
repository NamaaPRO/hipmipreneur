'use client';

import { useState } from 'react';
import { Brain, Rocket, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [idea, setIdea] = useState('');
  const router = useRouter();

  async function analyzeIdea() {
    if (!idea.trim()) return;
    
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="container mx-auto px-6 py-20">
        <nav className="flex justify-between items-center mb-20">
          <h1 className="text-3xl font-bold text-white">Hipmipreneur</h1>
          <a href="/dashboard" className="text-purple-300 hover:text-white transition">Dashboard</a>
        </nav>
        
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Turn Your Idea Into a <span className="text-purple-400">Business</span>
          </h2>
          <p className="text-xl text-purple-200 mb-10">
            AI-powered platform to validate, plan, and launch your startup in hours, not months.
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your business idea..."
              className="w-full bg-transparent text-white placeholder-purple-300 text-lg p-4 h-32 resize-none focus:outline-none"
            />
            <button 
              onClick={analyzeIdea}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 mx-auto transition"
            >
              <Brain className="w-5 h-5" />
              Analyze My Idea
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-white text-center mb-16">Everything You Need</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Brain, title: 'AI Analysis', desc: 'Deep market & competition analysis' },
            { icon: Rocket, title: 'Validation', desc: 'Validate product-market fit' },
            { icon: Users, title: 'Buyer Persona', desc: 'Create ideal customer profiles' },
            { icon: TrendingUp, title: 'Roadmap', desc: 'Step-by-step execution plan' },
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-purple-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}