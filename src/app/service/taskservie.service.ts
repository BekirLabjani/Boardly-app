import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root', // Hier wird der Service global bereitgestellt
})
export class TaskService {
  constructor(private firestore: Firestore) {}

  async getTasks(): Promise<Task[]> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'tasks'));
      return querySnapshot.docs.map(doc => doc.data() as Task);
    } catch (error) {
      console.error('Error fetching tasks: ', error);
      return [];
    }
  }
}