import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  welcome = 'heiiiii';
  tasks = signal( [
    'first  task',
    'second task',
    'last task'
  ]);

  name = signal('alvaro');
  disabled = false;
  img = 'https://www.lapatria.com/sites/default/files/styles/ampliar_945/public/noticia/2023-11/WhatsApp%20Image%202023-11-23%20at%209.25.28%20AM_0.jpeg?itok=jCsEGEQx';

  person = signal({
    name : 'alvaro',
    age : 20,
    avatar: this.img
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  });

  nameCtrl = new FormControl('alvaro', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),

    ]
  })

  constructor(){
    this.colorCtrl.valueChanges.subscribe(v => console.log(v));
  }

  clickHandler(){
    alert('oeeee');
  }

  clickHandlerDouble(){
    alert('oeeee double');
  }

  changeInput(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
    console.log(this.name());
  }

  keyDownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    this.person.update((currentState) => {
      return {
        ...currentState,
        name: input.value,
      }
    })
  }


}
