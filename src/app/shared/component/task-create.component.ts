import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: '../../features/tasks/pages/task-create.component.html',
  styleUrls: ['../../../styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  private readonly router = inject(Router);

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['medium', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      priority: '',
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      const { title, description, priority } = this.taskForm.value;

      this.taskService.createTask(title, description, priority, new Date());

      this.taskForm.reset({
        title: '',
        description: '',
        priority: '',
      });

      this.router.navigate(['/']);
    }
  }

  close(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
