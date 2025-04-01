import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task._id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  deleteAllTasks(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`);
  }

  completeAllTasks(): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/complete`, {completed: true});
  }
  uncompleteAllTasks(): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/uncomplete`, {completed: false});
  }
}
