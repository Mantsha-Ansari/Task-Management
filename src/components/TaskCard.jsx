import React from 'react';
import { Calendar, Edit, Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { formatDate, isOverdue, getDaysUntilDue } from '../utils/dateUtils';

// TaskCard component - displays a single task in a card format
// Props: task data, project info, and callback functions
export const TaskCard = ({ task, project, onEdit, onDelete, onToggleStatus }) => {
  
  // Helper function to get the right icon based on task status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': 
        return <CheckCircle className="icon status-completed" />;
      case 'in-progress': 
        return <Clock className="icon status-progress" />;
      default: 
        return <AlertTriangle className="icon status-todo" />;
    }
  };

  // Helper function to determine if task is due soon or overdue
  const getDueDateStatus = () => {
    if (!task.dueDate) return null; // No due date set
    
    // Check if task is overdue and not completed
    if (isOverdue(task.dueDate) && task.status !== 'completed') {
      return <span className="due-status overdue">Overdue</span>;
    }
    
    // Check if task is due within 3 days
    const daysLeft = getDaysUntilDue(task.dueDate);
    if (daysLeft <= 3 && daysLeft >= 0 && task.status !== 'completed') {
      return <span className="due-status due-soon">Due soon</span>;
    }
    
    return null; // Task is not urgent
  };

  return (
    <div className={`card task-card ${task.status === 'completed' ? 'completed' : ''}`}>
      {/* Task header with status icon, priority, and action buttons */}
      <div className="task-header">
        <div className="task-status-priority">
          {/* Status toggle button */}
          <button
            className="status-btn"
            onClick={() => onToggleStatus(task.id)}
            title="Click to change status"
          >
            {getStatusIcon(task.status)}
          </button>
          
          {/* Priority indicator dot */}
          <div className={`priority-dot priority-${task.priority}`} />
        </div>
        
        {/* Action buttons (edit and delete) */}
        <div className="task-actions">
          <button
            className="action-btn"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            <Edit className="icon" />
          </button>
          <button
            className="action-btn danger"
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            <Trash2 className="icon" />
          </button>
        </div>
      </div>

      {/* Task content - title and description */}
      <div className="task-content">
        <h3 className={task.status === 'completed' ? 'completed' : ''}>
          {task.title}
        </h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      {/* Task footer with project, priority, and due date info */}
      <div className="task-footer">
        <div className="task-meta">
          {/* Project tag */}
          {project && (
            <span 
              className="project-tag"
              style={{ backgroundColor: project.color }}
            >
              {project.name}
            </span>
          )}
          
          {/* Priority text */}
          <span className="priority-text">{task.priority}</span>
        </div>
        
        {/* Due date information */}
        <div className="task-date-info">
          {getDueDateStatus()}
          {task.dueDate && (
            <div className="date-display">
              <Calendar className="icon" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};