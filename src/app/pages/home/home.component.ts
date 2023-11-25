import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>( [
    {
      id: Date.now(),
      title : 'create project',
      completed: false,

    },
    {
      id: Date.now(),
      title : 'second task',
      completed: false,
    },
    {
      id: Date.now(),
      title : 'create component',
      completed: false,
    },
  ]);


  changeHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addTask(input.value);

   
  }

  addTask(title: string): void{
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((task) => [...task, newTask]);
  }

  deleteTask(index: number): void{
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index ));
  }

  updateTask(index: number): void{
    this.tasks.update((tasks: Task[]) => {
      return tasks.map((task: Task, position: number) => {
        if(position === index){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

}
