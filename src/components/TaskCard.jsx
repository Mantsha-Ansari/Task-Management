import { Calendar, Edit, Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { formatDate, isOverdue, getDaysUntilDue } from '../utils/dateUtils';

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
    
    return null; 
  };

  return (
    <div className={`card task-card ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-status-priority">
         
          <button
            className="status-btn"
            onClick={() => onToggleStatus(task.id)}
            title="Click to change status"
          >
            {getStatusIcon(task.status)}
          </button>
          
          
          <div className={`priority-dot priority-${task.priority}`} />
        </div>
        
        
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

      
      <div className="task-content">
        <h3 className={task.status === 'completed' ? 'completed' : ''}>
          {task.title}
        </h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      
      <div className="task-footer">
        <div className="task-meta">
         
          {project && (
            <span 
              className="project-tag"
              style={{ backgroundColor: project.color }}
            >
              {project.name}
            </span>
          )}
          
          
          <span className="priority-text">{task.priority}</span>
        </div>
        
       
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