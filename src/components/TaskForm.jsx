import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

export const TaskForm = ({ task, projects, onSave, onCancel }) => {
  
  
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'todo',
    dueDate: task?.dueDate || '',
    projectId: task?.projectId || (projects[0]?.id || '')
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    onSave(formData);
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button className="close-btn" onClick={onCancel}>
            <X className="icon" />
          </button>
        </div>

        
        <form onSubmit={handleSubmit} className="form">
         
          <div className="form-group">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              placeholder="Enter task title..."
              required
            />
          </div>

          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Enter task description..."
              rows={3}
            />
          </div>

          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={formData.priority}
                onChange={(e) => updateFormData('priority', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => updateFormData('status', e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Project and Due Date row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Project</label>
              <select
                className="form-select"
                value={formData.projectId}
                onChange={(e) => updateFormData('projectId', e.target.value)}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.dueDate}
                onChange={(e) => updateFormData('dueDate', e.target.value)}
              />
            </div>
          </div>

          {/* Form action buttons */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save className="icon" />
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};