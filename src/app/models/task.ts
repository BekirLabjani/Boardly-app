export interface Task {
    id?: string,
    title:string, // 'title
    description: string, // 'title
    assignTo:string, // 'kevin', ' ahmet'
    duDate:string, // '12.01.2023'
    priority: string, 
    category: string,
    subTasks:string,
    userId?: string; // Die ID des Benutzers, der die Aufgabe erstellt hat

}


