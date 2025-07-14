import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-edit',
  templateUrl: '../../features/tasks/pages/task-edit.component.html',
  styleUrls: ['../../../styles.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class TaskEditComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  taskForm!: FormGroup;
  taskId!: number;

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));

    console.log('TaskEditComponent initialized with taskId:', this.taskId);
    this.taskService.tasks$.pipe(take(1)).subscribe((tasks) => {
      const task = tasks.find((t) => t.id === this.taskId);

      if (!task) {
        this.router.navigate(['/']);
        return;
      }

      this.taskForm = this.fb.group({
        title: [task.title, Validators.required],
        description: [task.description],
        priority: [task.priority, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const { title, description, priority, updatedAt } = this.taskForm.value;

      this.taskService.updateTask(
        this.taskId,
        title,
        description,
        priority,
        updatedAt
      );

      this.router.navigate(['/']);
    }
  }

close(): void {
  this.router.navigate([{ outlets: { modal: null } }]);
}
}
