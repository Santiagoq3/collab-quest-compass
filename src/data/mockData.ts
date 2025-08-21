import { User, Project, Task, KanbanColumn } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
    role: 'Project Manager',
    isActive: true,
  },
  {
    id: '2',
    name: 'Alex Rivera',
    email: 'alex@company.com', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'Developer',
    isActive: true,
  },
  {
    id: '3',
    name: 'Maya Patel',
    email: 'maya@company.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'Developer',
    isActive: true,
  },
  {
    id: '4',
    name: 'Jordan Kim',
    email: 'jordan@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Admin',
    isActive: true,
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Modern e-commerce platform with advanced features',
    status: 'Active',
    progress: 75,
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdAt: '2024-01-15',
    dueDate: '2024-03-30',
    color: 'primary'
  },
  {
    id: '2', 
    name: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application',
    status: 'Active',
    progress: 45,
    members: [mockUsers[0], mockUsers[3]],
    createdAt: '2024-02-01',
    dueDate: '2024-04-15',
    color: 'success'
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Third-party API integration and documentation',
    status: 'Completed',
    progress: 100,
    members: [mockUsers[1], mockUsers[2]],
    createdAt: '2024-01-10',
    dueDate: '2024-02-28',
    color: 'warning'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design product catalog page',
    description: 'Create wireframes and high-fidelity designs for the product catalog with filtering and search functionality',
    status: 'In Progress',
    priority: 'High',
    assignee: mockUsers[0],
    watchers: [mockUsers[1]],
    dueDate: '2024-03-15',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05',
    projectId: '1',
    attachments: [],
    comments: [],
    tags: ['Design', 'UI/UX']
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Set up JWT-based authentication with login, registration, and password reset',
    status: 'Todo',
    priority: 'High',
    assignee: mockUsers[1],
    watchers: [],
    dueDate: '2024-03-20',
    createdAt: '2024-03-02',
    updatedAt: '2024-03-02',
    projectId: '1',
    attachments: [],
    comments: [],
    tags: ['Backend', 'Security']
  },
  {
    id: '3',
    title: 'Payment gateway integration',
    description: 'Integrate Stripe payment system for checkout process',
    status: 'Todo',
    priority: 'Medium',
    assignee: mockUsers[2],
    watchers: [mockUsers[0]],
    dueDate: '2024-03-25',
    createdAt: '2024-03-03',
    updatedAt: '2024-03-03',
    projectId: '1',
    attachments: [],
    comments: [],
    tags: ['Integration', 'Payment']
  },
  {
    id: '4',
    title: 'Setup testing framework',
    description: 'Configure Jest and React Testing Library for unit and integration tests',
    status: 'In Review',
    priority: 'Medium',
    assignee: mockUsers[1],
    watchers: [],
    dueDate: '2024-03-12',
    createdAt: '2024-02-28',
    updatedAt: '2024-03-08',
    projectId: '1',
    attachments: [],
    comments: [],
    tags: ['Testing', 'Quality']
  },
  {
    id: '5',
    title: 'Database optimization',
    description: 'Optimize database queries and add proper indexing',
    status: 'Done',
    priority: 'Low',
    assignee: mockUsers[2],
    watchers: [],
    dueDate: '2024-03-10',
    createdAt: '2024-02-25',
    updatedAt: '2024-03-10',
    projectId: '1',
    attachments: [],
    comments: [],
    tags: ['Database', 'Performance']
  }
];

export const kanbanColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    status: 'Todo',
    tasks: mockTasks.filter(task => task.status === 'Todo'),
    color: 'column-todo'
  },
  {
    id: 'progress',
    title: 'In Progress',
    status: 'In Progress',
    tasks: mockTasks.filter(task => task.status === 'In Progress'),
    color: 'column-progress'
  },
  {
    id: 'review',
    title: 'In Review',
    status: 'In Review',
    tasks: mockTasks.filter(task => task.status === 'In Review'),
    color: 'column-review'
  },
  {
    id: 'done',
    title: 'Done',
    status: 'Done',
    tasks: mockTasks.filter(task => task.status === 'Done'),
    color: 'column-done'
  }
];