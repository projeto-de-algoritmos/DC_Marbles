import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  string1FormControl = new FormControl('', [Validators.required,]);
  string2FormControl = new FormControl('', [Validators.required,]);
  result = '';
}
