import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

// Available colors for projects
const PROJECT_COLORS = [
  '#3B82F6', 
  '#8B5CF6',  
  '#10B981', 
  '#F59E0B', 
  '#EF4444', 
  '#06B6D4', 
  '#84CC16', 
  '#F97316'  
];

export const ProjectForm = ({ project, onSave, onCancel }) => {
  
  // Form state - stores all input values
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    color: project?.color || PROJECT_COLORS[0] 
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Please enter a project name');
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
            {project ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button className="close-btn" onClick={onCancel}>
            <X className="icon" />
          </button>
        </div>

        {/* Project form */}
        <form onSubmit={handleSubmit} className="form">
          {/* Project name input */}
          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="Enter project name..."
              required
            />
          </div>

          {/* Project description textarea */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Enter project description..."
              rows={3}
            />
          </div>

          {/* Color picker */}
          <div className="form-group">
            <label className="form-label">Project Color</label>
            <div className="color-picker">
              {PROJECT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => updateFormData('color', color)}
                  title={`Select ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Form action buttons */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save className="icon" />
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};