# User Management System

A React Typpplication for managing users, posts, and tasks using the JSONPlaceholder API.

## Features

- Users list with editable forms and validation
- Individual user details and post management
- Task list with filtering and pagination
- CRUD operations with optimistic updates

## Technology Stack

- React 19 with TypeScript
- Redux Toolkit with RTK Query
- Material-UI for components
- React Router for navigation

## Routes

- `/` - Homepage with navigation to Users and Tasks
- `/users` - Users list with add/edit functionality
- `/users/:id` - Individual user details
- `/users/:id/posts` - User's posts with CRUD operations
- `/tasks` - Tasks list with filtering and pagination

## Getting Started

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

Build for production:
```bash
npm run build
```

The application will be available at http://localhost:3000
