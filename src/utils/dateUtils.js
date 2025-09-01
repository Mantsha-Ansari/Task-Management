// Utility functions for working with dates
// These help us format dates and check if tasks are overdue

// Format a date string into a readable format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',  // Jan, Feb, Mar...
    day: 'numeric',  // 1, 2, 3...
    year: 'numeric'  // 2024, 2025...
  });
};

// Check if a task is overdue (past its due date)
export const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date();
};

// Calculate how many days until a task is due
export const getDaysUntilDue = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};