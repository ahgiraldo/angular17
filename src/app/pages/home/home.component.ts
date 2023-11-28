import { Component, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  injector = inject(Injector);

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTask();
  }

  trackTask(){
    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()))
      console.log(this.tasks());
    }, { injector: this.injector })
  }

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

  filter = signal<'all' | 'pending' | 'completed'>('all');
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter((task: Task) => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter((task: Task) => task.completed);
    }
    return tasks;
  })

  newtaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  }
  );

  changeHandler(): void {
    if(this.newtaskCtrl.valid){
      const value = this.newtaskCtrl.value.trim();
      if(value !== '' ){
        this.addTask(value);
        this.newtaskCtrl.setValue('');
      }
    }
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

  updateTaskEditingMode(index: number): void{
    this.tasks.update((prevState: Task[]) =>{
      return prevState.map((task : Task, position) => 
      {
        if(position === index){
          return {
            ...task,
            editing: true,
          }
        }
        return {
          ...task,
          editing: false,
        };
      })
    })
  }

  updateTaskEditingText(event: Event, index: number): void{
    const input = event.target as HTMLInputElement
    if(input.value.trim() !== ''){
      this.tasks.update((prevState: Task[]) =>{
        return prevState.map((task : Task, position) => 
        {
          if(position === index){
            return {
              ...task,
              title: input.value,
              editing: false,
            }
          }
          return task;
        })
      })
    }
   
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }

}
