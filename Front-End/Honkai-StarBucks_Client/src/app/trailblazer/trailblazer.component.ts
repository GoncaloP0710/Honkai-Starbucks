import { Component } from '@angular/core';

@Component({
  selector: 'app-trailblazer',
  templateUrl: './trailblazer.component.html',
  styleUrl: './trailblazer.component.css'
})
export class TrailblazerComponent {
  title = 'TrailBlazer';
  description = 'This is the TrailBlazer component';
  
  constructor() {
    console.log('TrailBlazer component loaded');
  }
}
