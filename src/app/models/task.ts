export interface Task {
  id: string;
  title: string;
  description: string;
  assignTo: string[];
  duDate: string;
  priority: 'low' | 'medium' | 'high';
  category: 'user' | 'frontend' | 'backend' | 'style';
  subTasks: string[];
  status: 'todo' | 'in progress' | 'await feedback' | 'done';
}

  

