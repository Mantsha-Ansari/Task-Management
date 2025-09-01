import React from 'react';
import { Filter } from 'lucide-react';

// FilterBar component - allows users to filter tasks by different criteria
// Props: current filter values, projects list, and change handler functions
export const FilterBar = ({
  selectedProject,
  selectedStatus,
  selectedPriority,
  projects,
  onProjectChange,
  onStatusChange,
  onPriorityChange
}) => {
  return (
    <div className="filter-bar">
      {/* Filter header with icon and title */}
      <div className="filter-header">
        <Filter className="icon" />
        <span className="filter-title">Filters</span>
      </div>
      
      {/* Filter controls grid */}
      <div className="filter-grid">
        {/* Project filter dropdown */}
        <select
          className="filter-select"
          value={selectedProject}
          onChange={(e) => onProjectChange(e.target.value)}
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        {/* Status filter dropdown */}
        <select
          className="filter-select"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority filter dropdown */}
        <select
          className="filter-select"
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
};