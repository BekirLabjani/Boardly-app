export interface Task {
    id: string;
    title: string;
    description: string;
    assignTo: string;
    duDate: string;
    priority: 'low' | 'medium' | 'high'; // Nur erlaubte Werte
    category: string;
    subTasks: string[];
    status: string;     // Füge hier die status-Eigenschaft hinzu
  }
  

