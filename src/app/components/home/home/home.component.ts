import { Component } from '@angular/core';
import { JokeComponent } from "../joke/joke.component";
import { AddComponent } from "../add/add.component";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [JokeComponent, AddComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
