import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { TaskService } from '../task.service'
import { Task } from '../task'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  today = new Date()
  tomorrow = new Date()

  tasks: Task[] = []

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1)
    this.getTasks()
  }

  handleClick(e: any, task: Task): void {
    if (e.target.name === 'checkbox') {
      this.save(task);
    } else {
      this.router.navigate(['task', task.id]);
    }
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      tasks.forEach((task) => {
        this.tasks.push({ ...task, datetime: new Date(task.datetime) })
      })
    })
  }

  save(task: Task): void {
    this.taskService.updateTask(task).subscribe()
  }
}
