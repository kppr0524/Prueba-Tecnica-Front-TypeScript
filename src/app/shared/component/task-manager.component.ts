import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../features/tasks/models/task.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-manager',
  templateUrl: '../../features/tasks/pages/task-manager.component.html',
  styleUrls: ['../../../styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class TaskManagerComponent {
  constructor(public service: TaskService) {
    this.loadTasks();
  }

  tasks = signal<Task[]>([]);
  newTitle = signal('');
  newDescription = signal('');
  newPriority = signal<'low' | 'medium' | 'high'>('low');

  pendingTasks = computed(
    () => this.tasks().filter((t) => !t.completed).length
  );
  completedTasks = computed(
    () => this.tasks().filter((t) => t.completed).length
  );

  loadTasks() {
    effect(() => this.service.tasks$.subscribe((ts) => this.tasks.set(ts)));
  }

  addTask(): void {
    const title = this.newTitle().trim();
    if (!title) return;
    this.service.addTask(title, this.newDescription(), this.newPriority(), new Date());
    this.newTitle.set('');
    this.newDescription.set('');
    this.newPriority.set('low');
  }

  toggleCompleted(id: number) {
    this.service.toggleTask(id);
  }
  deleteTask(id: number) {
    this.service.deleteTask(id);
  }

  editingTaskSignal = signal<Task | null>(null);
  editingTask = computed(() => this.editingTaskSignal());

  onEdit(task: Task) {
    this.editingTaskSignal.set(task);
  }
  onCloseEdit() {
    this.editingTaskSignal.set(null);
  }
}
