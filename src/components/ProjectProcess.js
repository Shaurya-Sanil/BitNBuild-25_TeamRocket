import React, { useState, useMemo } from 'react';
import { CheckCircle, UploadCloud } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To-Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'submitted', label: 'Submitted / Waiting for Review' },
  { value: 'done', label: 'Done' }
];

const ProjectProcess = ({ user }) => {
  // Mock multiple projects
  const initialProjects = [
    {
      id: 1,
      title: 'Brand Identity for CampusEats',
      client: 'CampusEats',
      status: 'in-progress',
      tasks: [
        { id: 1, title: 'Research', description: 'Competitor and moodboard research', dueDate: '2025-10-01', status: 'done', comments: [], attachments: [] },
        { id: 2, title: 'Draft designs', description: '3 initial logo concepts', dueDate: '2025-10-07', status: 'in-progress', comments: [], attachments: [] },
        { id: 3, title: 'Finalize files', description: 'Deliver vector files and guidelines', dueDate: '2025-10-14', status: 'todo', comments: [], attachments: [] }
      ]
    },
    {
      id: 2,
      title: 'React Native App for FitTracker',
      client: 'FitTracker Inc',
      status: 'todo',
      tasks: [
        { id: 1, title: 'Setup project', description: 'Initialize repo and dependencies', dueDate: '2025-10-02', status: 'todo', comments: [], attachments: [] },
        { id: 2, title: 'Auth screens', description: 'Build login/signup UI', dueDate: '2025-10-05', status: 'todo', comments: [], attachments: [] }
      ]
    },
    {
      id: 3,
      title: 'Social Media Campaign for TechStart',
      client: 'TechStart Solutions',
      status: 'todo',
      tasks: [
        { id: 1, title: 'Content plan', description: 'Draft posts and schedule', dueDate: '2025-10-03', status: 'todo', comments: [], attachments: [] }
      ]
    }
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0].id);
  const project = useMemo(() => projects.find(p => p.id === selectedProjectId), [projects, selectedProjectId]);

  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [submittingFinal, setSubmittingFinal] = useState(false);

  const updateProjects = (newProject) => {
    setProjects(prev => prev.map(p => p.id === newProject.id ? newProject : p));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const nextId = Math.max(0, ...project.tasks.map(t => t.id)) + 1;
    const task = { id: nextId, title: newTask.title, description: newTask.description, dueDate: newTask.dueDate || null, status: 'todo', comments: [], attachments: [] };
    const updated = { ...project, tasks: [...project.tasks, task] };
    updateProjects(updated);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const updateTaskStatus = (taskId, status) => {
    const updated = { ...project, tasks: project.tasks.map(t => t.id === taskId ? { ...t, status } : t) };
    updateProjects(updated);
  };

  const addComment = (taskId, text) => {
    if (!text.trim()) return;
    const updated = { ...project, tasks: project.tasks.map(t => t.id === taskId ? { ...t, comments: [...t.comments, { id: Date.now(), text, author: user?.name || 'Freelancer', date: new Date().toLocaleString() }] } : t) };
    updateProjects(updated);
  };

  const attachFile = (taskId, file) => {
    if (!file) return;
    const updated = { ...project, tasks: project.tasks.map(t => t.id === taskId ? { ...t, attachments: [...t.attachments, { id: Date.now(), name: file.name, size: file.size }] } : t) };
    updateProjects(updated);
  };

  const overallProgress = useMemo(() => {
    const total = project.tasks.length || 1;
    const done = project.tasks.filter(t => t.status === 'done').length;
    return Math.round((done / total) * 100);
  }, [project.tasks]);

  const submitFinalProject = () => {
    setSubmittingFinal(true);
    setTimeout(() => {
      const updated = { ...project, status: 'submitted', tasks: project.tasks.map(t => ({ ...t, status: t.status === 'done' ? 'done' : t.status })) };
      updateProjects(updated);
      setSubmittingFinal(false);
      alert('Final project submitted. Client will be notified to review.');
    }, 600);
  };

  const clientApprove = () => {
    const updated = { ...project, status: 'completed' };
    updateProjects(updated);
    alert('Project approved and marked completed. Payment can be released.');
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
        {/* Left sidebar: project tabs */}
        <div style={{ minWidth: 260 }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--spacing-md)' }}>My Projects</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {projects.map(p => (
              <button
                key={p.id}
                className={selectedProjectId === p.id ? 'button button-primary' : 'button button-outline'}
                style={{ textAlign: 'left', fontWeight: 600, fontSize: '1rem', padding: '12px', borderRadius: 10, background: selectedProjectId === p.id ? 'var(--colors-neutral-dark)' : 'var(--colors-background-surface)', color: selectedProjectId === p.id ? 'var(--colors-text-onDark)' : 'var(--colors-text-primary)', border: selectedProjectId === p.id ? 'none' : '2px solid var(--colors-border-subtle)' }}
                onClick={() => setSelectedProjectId(p.id)}
              >
                {p.title}
                <div style={{ fontSize: 'var(--metadata-font-size)', color: selectedProjectId === p.id ? 'var(--colors-text-onDarkSecondary)' : 'var(--colors-text-secondary)' }}>{p.client}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main project process area */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>{project.title}</h1>
            <p style={{ color: 'var(--colors-text-secondary)' }}>Client: {project.client} • Status: {project.status}</p>
          </div>

          <div className="card card-light" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-md)' }}>
              <div>
                <div style={{ fontSize: 'var(--body-font-size)', color: 'var(--colors-text-secondary)' }}>Overall Progress</div>
                <div style={{ marginTop: '8px', width: 360, background: 'var(--colors-background-surface)', borderRadius: 8, height: 14 }}>
                  <div style={{ width: `${overallProgress}%`, height: '100%', background: 'var(--colors-primary-limeText)', borderRadius: 8 }} />
                </div>
              </div>
              <div style={{ fontWeight: 700 }}>{overallProgress}%</div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
            {project.tasks.map(task => (
              <div key={task.id} className="card card-light">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-md)' }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 700 }}>{task.title} {task.dueDate && <span style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)', marginLeft: 8 }}>• Due {task.dueDate}</span>}</div>
                    <p style={{ color: 'var(--colors-text-secondary)' }}>{task.description}</p>
                  </div>

                  <div style={{ minWidth: 220, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <select value={task.status} onChange={(e) => updateTaskStatus(task.id, e.target.value)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--colors-border-subtle)' }}>
                      {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <UploadCloud size={16} />
                        <input type="file" style={{ display: 'none' }} onChange={(e) => attachFile(task.id, e.target.files[0])} />
                      </label>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--spacing-sm)', borderTop: '1px solid var(--colors-border-subtle)', paddingTop: 'var(--spacing-sm)' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input placeholder="Add a comment" onKeyDown={(e) => { if (e.key === 'Enter') { addComment(task.id, e.target.value); e.target.value = ''; } }} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid var(--colors-border-subtle)' }} />
                    <button className="button button-primary" onClick={() => { /* noop: keyboard enter handles adding */ }}>Add</button>
                  </div>

                  {task.attachments.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      <strong>Attachments:</strong>
                      <ul>
                        {task.attachments.map(a => <li key={a.id}>{a.name} ({Math.round(a.size/1024)} KB)</li>)}
                      </ul>
                    </div>
                  )}

                  {task.comments.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      <strong>Comments:</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                        {task.comments.map(c => (
                          <div key={c.id} style={{ background: 'var(--colors-background-surface)', padding: '8px', borderRadius: 8 }}>
                            <div style={{ fontSize: 'var(--metadata-font-size)', color: 'var(--colors-text-secondary)' }}>{c.author} • {c.date}</div>
                            <div>{c.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="button button-primary" onClick={submitFinalProject} disabled={submittingFinal || overallProgress < 100}>{submittingFinal ? 'Submitting...' : 'Submit Final Project'}</button>
            {user?.role === 'client' && project.status === 'submitted' && (
              <button className="button button-secondary" onClick={clientApprove}>Approve & Complete Project</button>
            )}
            <div style={{ marginLeft: 'auto', color: 'var(--colors-text-secondary)' }}><CheckCircle size={16} style={{ marginRight: 6 }} /> Project status: {project.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProcess;
