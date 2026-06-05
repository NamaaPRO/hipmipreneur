'use client';

import { useState, useEffect } from 'react';
import { type Project } from '@/types';

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    async function fetchProject() {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProject(data);
      }
      
      setLoading(false);
    }

    fetchProject();
  }, [id]);

  async function updateProject(updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    setProject(data);
    return data;
  }

  return {
    project,
    loading,
    error,
    updateProject,
  };
}

import { supabase } from '@/lib/supabase';
