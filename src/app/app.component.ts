import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { timer, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Marbles } from '../algorithm/Marbles';
import { MeenaSelect } from '../algorithm/MeenaSelect';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  answer = new FormControl(0, [Validators.required,]);
  difficultValues: string[] = ['hard', 'medium', 'easy'];
  selectedValue: string = 'easy';
  numbers: number[] = [];
  subscribeTimer: any = 0;
  timeLeft: number = 60;
  marbles: Marbles = new Marbles();
  init: boolean = false;
  response?: MeenaSelect;
  source = timer(1000, 1000);
  subscription?: Subscription;

  start() {
    this.numbers = this.marbles.difficultMarbles(this.selectedValue);
    this.response = this.marbles.meenaMarbleSelectedToConsult(this.numbers);

    console.log(this.response);

    Swal.fire({
      // icon: 'error',
      title: 'Boa sorte',
      text: `Adivinhe a posição do número: ${this.response.selectMarble}`
    }).then((result) => {
      this.init = true
      this.observableTimer()
    });
  }

  observableTimer() {
    this.subscribeTimer = this.timeLeft;
    this.subscription = this.source.subscribe(val => {
      if (this.subscribeTimer <= 0) {
        this.subscribeTimer = 0
      } else {
        console.log(val, '-');
        this.subscribeTimer = this.timeLeft - val;
      }
    });
  }

  cancelTimer() {
    this.subscription?.unsubscribe()
  }

  confirmwAnswer() {
    console.log(this.answer.value);
    this.init = false;
    this.cancelTimer();
    if (this.response?.position == undefined) {
      if (this.answer.value == 0) {
        Swal.fire({
          icon: 'success',
          title: 'Parabens!!!',
          text: 'Você acertou!'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Não foi dessa vez',
          text: 'Você não acertou a posição correta.'
        });
      }
    } else if (this.answer.value == this.response.position) {
      Swal.fire({
          icon: 'success',
          title: 'Parabens!!!',
          text: 'Você acertou!'
        });
    } else {
      Swal.fire({
          icon: 'error',
          title: 'Não foi dessa vez',
          text: 'Você não acertou a posição correta.'
        });
    }
  }
}
