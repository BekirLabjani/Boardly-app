export interface Task {
    id: string;
    title: string;
    description: string;
    assignTo: string;
    duDate: string;
    priority: string;   // (Optional: Du kannst dies beibehalten, wenn du es noch brauchst)
    category: string;
    subTasks: string[];
    status: string;     // Füge hier die status-Eigenschaft hinzu
  }
  

