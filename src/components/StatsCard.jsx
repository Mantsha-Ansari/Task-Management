import { CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react';

export const StatsCard = ({ stats }) => {
  
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="stats-grid">
      {/* Total Tasks Card */}
      <div className="stat-card total">
        <div className="stat-header">
          <div>
            <p className="stat-label">Total Tasks</p>
            <p className="stat-value">{stats.total}</p>
          </div>
          <BarChart3 className="stat-icon" />
        </div>
      </div>

      {/* Completed Tasks Card with Progress Bar */}
      <div className="stat-card completed">
        <div className="stat-header">
          <div>
            <p className="stat-label">Completed</p>
            <p className="stat-value">{stats.completed}</p>
          </div>
          <CheckCircle className="stat-icon" />
        </div>
        {/* Progress bar showing completion percentage */}
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="progress-text">{completionRate}% completion rate</p>
      </div>

      {/* In Progress Tasks Card */}
      <div className="stat-card progress">
        <div className="stat-header">
          <div>
            <p className="stat-label">In Progress</p>
            <p className="stat-value">{stats.inProgress}</p>
          </div>
          <Clock className="stat-icon" />
        </div>
      </div>

      {/* Overdue Tasks Card */}
      <div className="stat-card overdue">
        <div className="stat-header">
          <div>
            <p className="stat-label">Overdue</p>
            <p className="stat-value">{stats.overdue}</p>
          </div>
          <AlertCircle className="stat-icon" />
        </div>
      </div>
    </div>
  );
};