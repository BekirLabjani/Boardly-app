import { SubInterface } from "./sub-interface";


export interface Task {
  id: string;
  title: string;
  description: string;
  assignTo: string[];
  duDate?: string; // Optional, falls kein Fälligkeitsdatum benötigt wird
  priority: 'low' | 'medium' | 'high';
  category: string;
  subTasks: SubTask[];
  status: string;
}

export interface SubTask {
  title: string;
  completed: boolean;
}