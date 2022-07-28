import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { TaskService } from '../task.service'
import { Task } from '../task'

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  task: Task = {
    id: -1,
    done: false,
    title: '',
    description: '',
    datetime: new Date()
  }

  constructor(private location: Location, private taskService: TaskService) {}

  ngOnInit(): void {}

  cancel(): void {
    this.location.back()
  }

  save(): void {
    // for some reason, when I save the date, it subtracts one day
    // maybe days start at 0, not sure
    this.task.datetime.setDate(this.task.datetime.getDate() + 1)
    this.taskService.addTask(this.task).subscribe(() => this.location.back())
  }
}
