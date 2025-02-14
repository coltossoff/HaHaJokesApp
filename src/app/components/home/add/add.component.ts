import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-add',
  imports: [ReactiveFormsModule, FormsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

}
