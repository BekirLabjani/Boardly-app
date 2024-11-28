import { SubInterface } from "./sub-interface";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignTo: string[];
  duDate: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  subTasks: SubInterface[]; // Korrekte Definition
  status: string;
}
