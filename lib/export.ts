import { type Project } from '@/types';

export function exportToJSON(project: Project): string {
  return JSON.stringify(project, null, 2);
}

export function exportToMarkdown(project: Project): string {
  let md = `# ${project.idea}\n\n`;
  md += `---\n\n`;
  
  if (project.analysis) {
    md += `## AI Analysis\n\n`;
    md += `- **Summary:** ${project.analysis.summary}\n`;
    md += `- **Validation Score:** ${project.analysis.validation_score}/100\n`;
    if (project.analysis.market_size) {
      md += `- **Market Size:** ${project.analysis.market_size}\n`;
    }
    md += `\n`;
  }
  
  if (project.business_canvas) {
    md += `## Business Model Canvas\n\n`;
    Object.entries(project.business_canvas).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        md += `### ${key.replace('_', ' ')}\n`;
        value.forEach(v => md += `- ${v}\n`);
        md += `\n`;
      }
    });
  }
  
  if (project.buyer_persona) {
    const p = project.buyer_persona;
    md += `## Buyer Persona: ${p.name}\n\n`;
    md += `- **Age:** ${p.age}\n`;
    md += `- **Job Title:** ${p.job_title}\n\n`;
    md += `### Goals\n`;
    p.goals.forEach(g => md += `- ${g}\n`);
    md += `\n### Pain Points\n`;
    p.pain_points.forEach(pp => md += `- ${pp}\n`);
    md += `\n`;
  }
  
  if (project.roadmap) {
    md += `## Execution Roadmap\n\n`;
    project.roadmap.phases.forEach(phase => {
      md += `### ${phase.phase} (${phase.duration})\n\n`;
      md += `**Tasks:**\n`;
      phase.tasks.forEach(t => md += `- ${t}\n`);
      md += `\n**Milestones:**\n`;
      phase.milestones.forEach(m => md += `- ${m}\n`);
      md += `\n`;
    });
  }
  
  return md;
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
