import { Routes } from '@angular/router';
import { TaskManagerComponent } from './shared/component/task-manager.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskManagerComponent,
  },
  {
    path: 'task/create',
    outlet: 'modal',
    loadComponent: () =>
      import('./shared/component/task-create.component').then(
        (m) => m.TaskCreateComponent
      ),
  },
  {
    path: 'task/edit/:id',
    outlet: 'modal',
    loadComponent: () =>
      import('./shared/component/task-edit.component').then(
        (m) => m.TaskEditComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
