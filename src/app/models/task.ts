export interface Task {
  id: string;
  title: string;
  description: string;
  assignTo: string[];
  duDate: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  subTasks: SubTask[]; // SubTasks sind Objekte, nicht Strings
  status: string;
}

  
export interface SubTask {
  title: string;
  completed: boolean;
}

