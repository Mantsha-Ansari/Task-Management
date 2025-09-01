import React from 'react';
import { Plus } from 'lucide-react';

// Header component - displays app title and main action buttons
// Props: functions to call when buttons are clicked
export const Header = ({ onNewTask, onNewProject }) => {
  return (
    <header className="header">
      <div className="header-content">
        {/* App logo and title section */}
        <div className="header-brand">
          <div className="logo">📋</div>
          <div>
            <h1 className="app-title">Task<span>Master</span></h1>
            <p className="app-subtitle">Professional Task Management</p>
          </div>
        </div>

        {/* Action buttons section */}
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={onNewProject}
          >
            <Plus className="icon" />
            New Project
          </button>
          <button 
            className="btn btn-primary"
            onClick={onNewTask}
          >
            <Plus className="icon" />
            New Task
          </button>
        </div>
      </div>
    </header>
  );
};