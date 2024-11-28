// subtask.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubInterface } from '../models/sub-interface';
@Injectable({
  providedIn: 'root'
})
export class SubtaskService {
  private subTasksSubject = new BehaviorSubject<SubInterface[]>([]);
  subTasks$ = this.subTasksSubject.asObservable();

  setSubTasks(subTasks: SubInterface[]) {
    this.subTasksSubject.next(subTasks);
  }

  getSubTasks() {
    return this.subTasksSubject.value;
  }
}

