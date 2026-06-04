'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Brain, LogOut } from 'lucide-react';

interface Project {
  id: string;
  idea: string;
  analysis: any;
  created_at: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    loadProjects();
  }

  async function loadProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    setProjects(data || []);
    setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Hipmipreneur</h1>
        <button onClick={handleSignOut} className="text-slate-400 hover:text-white flex items-center gap-2">
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Your Projects</h2>
          <a href="/" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold">
            + New Project
          </a>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : projects.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
            <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-slate-400 mb-6">Submit your first idea on the home page</p>
            <a href="/" className="text-purple-400 hover:text-purple-300">Go to Home →</a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{project.idea}</h3>
                <p className="text-slate-400 text-sm mb-4">
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
                <a 
                  href={`/dashboard/project/${project.id}`}
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm text-center"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}