import { Injectable } from '@angular/core'
import { Task } from './task'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  constructor() {}

  createDb() {
    let tasks: Task[] = []
    for (let i = 0; i < 4; i++) {
      let d = new Date();
      d.setDate(d.getDate() - 1 + i);
      tasks.push({
        id: i,
        done: false,
        title: `Task ${i}`,
        description: `Description ${i}`,
        datetime: d,
      })
    }
    return { tasks }
  }

  genId(tasks: Task[]): number {
    // returns the max id plus 1 or the number 1
    return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1
  }
}
