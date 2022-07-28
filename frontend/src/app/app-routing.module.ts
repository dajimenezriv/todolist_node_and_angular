import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { InboxComponent } from './inbox/inbox.component'
import { NewTaskComponent } from './new-task/new-task.component'
import { TaskDetailComponent } from './task-detail/task-detail.component'

const routes: Routes = [
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'new_task', component: NewTaskComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'inbox/?term=:term', component: InboxComponent },
  { path: '', redirectTo: '/inbox', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
