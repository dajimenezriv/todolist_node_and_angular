import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Task } from './task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    // returns a function that expects an error as input
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      tap((_) => console.log('fetched tasks')),
      catchError(this.handleError<Task[]>('getTasks', []))
    )
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`
    return this.http.get<Task>(url).pipe(
      tap((_) => console.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    )
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => console.log(`added hero w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    )
  }

  deleteTask(id: Number): Observable<any> {
    const url = `${this.tasksUrl}/${id}`
    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted task id=${id}`)),
      catchError(this.handleError<any>('deleteTask'))
    )
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((_) => console.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    )
  }
}
