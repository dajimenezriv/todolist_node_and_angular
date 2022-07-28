import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1)
    this.route.queryParams.subscribe((params) => {
      const { term } = params
      if (term) this.searchTasks(term)
      else this.getTasks()
    })
  }

  handleClick(e: any, task: Task): void {
    if (e.target.name === 'checkbox') {
      this.save(task)
    } else {
      this.router.navigate(['task', task.id])
    }
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.map((task) => ({
        ...task,
        datetime: new Date(task.datetime)
      }))
    })
  }

  searchTasks(term: string): void {
    // not working
    this.taskService.searchTasks(term).subscribe((tasks) => {
      console.log(tasks);
      this.tasks = tasks.map((task) => ({
        ...task,
        datetime: new Date(task.datetime)
      }))
    })
  }

  save(task: Task): void {
    this.taskService.updateTask(task).subscribe()
  }
}
