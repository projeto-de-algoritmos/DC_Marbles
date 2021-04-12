import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { timer, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Marbles } from '../algorithm/Marbles';
import { MeenaSelect } from '../algorithm/MeenaSelect';
import { Difficult } from './models/Difficult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  answer = new FormControl(0, [Validators.required,]);
  difficultValues: Difficult[] = [{ text: 'hard', time: 120 }, { text: 'medium', time: 80 }, { text: 'easy', time: 30 }];
  selectedValue: Difficult = { text: 'easy', time: 30 };
  numbers: number[] = [];
  subscribeTimer: any = 0;
  marbles: Marbles = new Marbles();
  init: boolean = false;
  response?: MeenaSelect;
  source = timer(1000, 1000);
  subscription?: Subscription;

  start() {
    this.numbers = this.marbles.difficultMarbles(this.selectedValue.text);
    const orderedVector = this.marbles.mergesort(this.numbers);
    this.response = this.marbles.meenaMarbleSelectedToConsult(orderedVector);

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
    this.subscribeTimer = this.selectedValue.time;
    this.subscription = this.source.subscribe(val => {
      if (this.subscribeTimer <= 0) {
        this.cancelTimer();
        this.subscribeTimer = 0
        this.init = false;
        Swal.fire({
          icon: 'error',
          title: 'Demorou demais brother',
          text: 'Você não conseguiu responder a tempo, tente novamente.'
        });
      } else {
        console.log(val, '-');
        this.subscribeTimer = this.selectedValue.time - val;
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
    } else if ((this.answer.value -1) == this.response.position) {
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
