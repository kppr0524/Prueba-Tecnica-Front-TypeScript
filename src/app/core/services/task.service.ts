
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task } from '../../features/tasks/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/tasks';
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  get tasks$(): Observable<Task[]> {
    // Solo dispara fetchTasks si el subject está vacío
    if (this.tasksSubject.value.length === 0) {
      this.fetchTasks();
    }
    return this.tasksSubject.asObservable();
  }

  fetchTasks(): void {
    this.http.get<Task[]>(this.baseUrl)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks)),
        catchError((error) => {
          console.error('Error al obtener tareas:', error);
          this.tasksSubject.next([]);
          return of([]);
        })
      )
      .subscribe();
  }

  addTask(title: string, description: string, priority: 'low' | 'medium' | 'high', createdAt: Date): void {
    this.http.post<Task>(this.baseUrl, { title, description, priority, createdAt })
      .pipe(
        tap(() => this.fetchTasks()),
        catchError((error) => {
          console.error('Error al agregar tarea:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  toggleTask(id: number): void {
    const task = this.tasksSubject.value.find(t => t.id === id);
    if (task) {
      this.http.patch<Task>(`${this.baseUrl}/${id}`, { completed: !task.completed })
        .pipe(
          tap(() => this.fetchTasks()),
          catchError((error) => {
            console.error('Error al cambiar estado de tarea:', error);
            return of(null);
          })
        )
        .subscribe();
    }
  }

  deleteTask(id: number): void {
    this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => this.fetchTasks()),
        catchError((error) => {
          console.error('Error al eliminar tarea:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  updateTask(id: number, title: string, description: string,  priority: 'low' | 'medium' | 'high', updatedAt: Date): void {
    this.http.put<Task>(`${this.baseUrl}/${id}`, { title, description, priority, updatedAt })
      .pipe(
        tap(() => this.fetchTasks()),
        catchError((error) => {
          console.error('Error al actualizar tarea:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  pendingCount(): number {
    return this.tasksSubject.value.filter(t => !t.completed).length;
  }

  completedCount(): number {
    return this.tasksSubject.value.filter(t => t.completed).length;
  }
}
