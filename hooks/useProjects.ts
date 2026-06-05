'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { type Project } from '@/types';

export function useProjects(userId?: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProjects(data || []);
    }
    
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function createProject(idea: string) {
    const { data, error } = await supabase
      .from('projects')
      .insert({ user_id: userId, idea })
      .select()
      .single();

    if (error) throw error;
    
    setProjects(prev => [data, ...prev]);
    return data;
  }

  async function deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  async function updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    setProjects(prev => prev.map(p => p.id === id ? data : p));
    return data;
  }

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    deleteProject,
    updateProject,
  };
}