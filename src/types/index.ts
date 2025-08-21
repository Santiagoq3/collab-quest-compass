export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Project Manager' | 'Developer' | 'Viewer';
  isActive: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold' | 'Cancelled';
  progress: number;
  members: User[];
  createdAt: string;
  dueDate: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'In Review' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  assignee: User | null;
  watchers: User[];
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  attachments: Attachment[];
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  mentions: User[];
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video' | 'other';
  size: number;
  uploadedBy: User;
  uploadedAt: string;
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_updated' | 'comment_added' | 'status_changed' | 'assignee_changed';
  description: string;
  user: User;
  timestamp: string;
  taskId?: string;
  projectId?: string;
}

export interface Notification {
  id: string;
  type: 'mention' | 'assignment' | 'comment' | 'status_change' | 'due_date';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: Task['status'];
  tasks: Task[];
  color: string;
}