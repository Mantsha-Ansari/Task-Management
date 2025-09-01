# Task Management Application

This is a simple and modern task management application built with React and Vite. It helps you create, organize, and track your tasks and projects easily.

## Features

- Create, edit, and delete tasks
- Organize tasks by projects
- Track task status: Todo, In Progress, Completed
- Set task priority and due dates
- Data is saved automatically in your browser (local storage)
- Responsive design for desktop and mobile

## Technologies Used

- React (JavaScript)
- Vite (build tool and development server)
- CSS for styling
- Local Storage API for saving data in the browser

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173
   ```

## How to Use

- Click "Create Task" to add a new task
- Fill in the task details and save
- Use the filter bar to find tasks by project, status, or priority
- Click on task status to change it (Todo → In Progress → Completed)
- Tasks and projects are saved automatically in your browser

## Project Structure

```
project/
├── src/
│   ├── components/      # UI components like Header, TaskCard, Forms
│   ├── hooks/           # Custom React hooks (e.g., useLocalStorage)
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── App.css          # Styles for the app
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── package.json         # Project dependencies and scripts
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build

---

Happy task managing! 🎉
---

Made with ❤️ by Mantsha Ansari
