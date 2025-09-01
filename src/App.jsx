import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { ProjectForm } from './components/ProjectForm';
import { FilterBar } from './components/FilterBar';
import { FileUpload } from './components/FileUpload';
import { useLocalStorage } from './hooks/useLocalStorage';
import { isOverdue } from './utils/dateUtils';
import './App.css';

// Main App component - this controls our entire application
function App() {
  // State management using React hooks
  // These store our data and control what the user sees
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [projects, setProjects] = useLocalStorage('projects', [
    {
      id: '1',
      name: 'Personal',
      description: 'Personal tasks and goals',
      color: '#3B82F6',
      createdAt: new Date().toISOString()
    },
    {
      id: '2', 
      name: 'Work',
      description: 'Work-related tasks',
      color: '#10B981',
      createdAt: new Date().toISOString()
    }
  ]);

  // State for controlling which forms are visible
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // State for filtering tasks
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  // Calculate statistics for the dashboard
  // This runs every time tasks change
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    todo: tasks.filter(task => task.status === 'todo').length,
    overdue: tasks.filter(task => task.dueDate && isOverdue(task.dueDate) && task.status !== 'completed').length
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    if (selectedProject && task.projectId !== selectedProject) return false;
    if (selectedStatus && task.status !== selectedStatus) return false;
    if (selectedPriority && task.priority !== selectedPriority) return false;
    return true;
  });

  // Function to save a new task or update existing one
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? { ...task, ...taskData } : task
      ));
    } else {
      // Create new task
      const newTask = {
        id: crypto.randomUUID(), // Generate unique ID
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
        dueDate: taskData.dueDate,
        projectId: taskData.projectId,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
    }
    
    // Close form and reset editing state
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // Function to save a new project or update existing one
  const handleSaveProject = (projectData) => {
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === editingProject.id ? { ...project, ...projectData } : project
      ));
    } else {
      // Create new project
      const newProject = {
        id: crypto.randomUUID(),
        name: projectData.name,
        description: projectData.description,
        color: projectData.color,
        createdAt: new Date().toISOString()
      };
      setProjects([...projects, newProject]);
    }
    
    // Close form and reset editing state
    setShowProjectForm(false);
    setEditingProject(null);
  };

  // Function to delete a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to toggle task status between todo, in-progress, and completed
  const handleToggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        let newStatus;
        switch (task.status) {
          case 'todo':
            newStatus = 'in-progress';
            break;
          case 'in-progress':
            newStatus = 'completed';
            break;
          case 'completed':
            newStatus = 'todo';
            break;
          default:
            newStatus = 'todo';
        }
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  // Function to start editing a task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Function to start editing a project
  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  // Function to handle file upload
  const handleFileUpload = (file) => {
    // For now, just show an alert - you can extend this later
    alert(`File uploaded: ${file.name}`);
  };

  return (
    <div className="app">
      <Header 
        onNewTask={() => setShowTaskForm(true)}
        onNewProject={() => setShowProjectForm(true)}
      />
      <div style={{margin:"1.4rem"}}>
       <h1 style={{color:"#764ba2"}}>Dashboard Overview</h1>
       <p style={{color:"white" }}>Track your progress and manages task efficiently</p>
      </div>
      {/* Main content area */}
      <main className="main-content">
        {/* Statistics cards showing overview */}
        <StatsCard stats={stats} />

        {/* Filter bar for sorting tasks */}
        <FilterBar
          selectedProject={selectedProject}
          selectedStatus={selectedStatus}
          selectedPriority={selectedPriority}
          projects={projects}
          onProjectChange={setSelectedProject}
          onStatusChange={setSelectedStatus}
          onPriorityChange={setSelectedPriority}
        />

        {/* File upload component */}
        <FileUpload onFileUpload={handleFileUpload} />

        {/* Task grid - displays all filtered tasks */}
        <div className="task-grid">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks found</h3>
              <p>Create your first task to get started!</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowTaskForm(true)}
              >
                <Plus className="icon" />
                Create Task
              </button>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                project={projects.find(p => p.id === task.projectId)}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleTaskStatus}
              />
            ))
          )}
        </div>
      </main>

      {/* Modal forms - only show when needed */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          projects={projects}
          onSave={handleSaveTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}

export default App;