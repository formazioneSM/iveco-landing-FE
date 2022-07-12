import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-ring-counter',
  templateUrl: './ring-counter.component.html',
  styleUrls: ['./ring-counter.component.scss']
})

export class RingCounterComponent implements OnInit, OnDestroy {
  @Input() date: string | undefined;
  @Input() all: boolean | undefined;
  @Output('end') end:EventEmitter<any> = new EventEmitter();
  seconds = 0;
  minutes = 0;
  hours = 0;
  days = 0;
  secondsStrokeDashArray = '';
  minutesStrokeDashArray = '';
  hoursStrokeDashArray = '';
  daysStrokeDashArray = '';

  counters:any[] = [];


  totalSeconds = 0;

  dateChecker: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
    const day:any = this.date?.replace(/'/g,'');
    // let day = "Jun 1 2021 11:00:00";
    // if (window.location.href.includes('/press') || window.location.href.includes('/live-pages/press')) {
    //   day = "Jun 1 2021 11:00:00";
    // }
    if (day === 'null') {
      return;
    }
    let dateNow = new Date();
    let dDay = new Date(day);
    const milliSecondsInASecond = 1000;
    const hoursInADay = 24;
    const minutesInAnHour = 60;
    const SecondsInAMinute = 60;

    let timeDifference = dDay.getTime() - dateNow.getTime();
    if (timeDifference <= 0) {
      ['seconds', 'minutes', 'hours', 'days'].map(text => {
        this.counters.push({
          text: text,
          strokeDashArray: '',
          value: 0
        })
      })
      this.countTimeDifference();
      return;
    }

    this.counters.push({
      text: 'seconds',
      strokeDashArray: '',
      value: Math.floor(
        (timeDifference / milliSecondsInASecond) % SecondsInAMinute
      )
    })
    this.counters.push({
      text: 'minutes',
      strokeDashArray: '',
      value: Math.floor(
        (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
        SecondsInAMinute
      )
    })
    this.counters.push({
      text: 'hours',
      strokeDashArray: '',
      value: Math.floor(
        (timeDifference /
          (milliSecondsInASecond *
            minutesInAnHour *
            SecondsInAMinute)) %
        hoursInADay
      )
    })
    this.counters.push({
      text: 'days',
      strokeDashArray: '',
      value: Math.floor(
        timeDifference /
        (milliSecondsInASecond *
          minutesInAnHour *
          SecondsInAMinute *
          hoursInADay)
      )
    })

    this.totalSeconds = (this.counters[3].value * 24 + this.counters[2].value) * 60 * 60 + (this.counters[1].value * 60) + this.counters[0].value;

    this.dateChecker = interval(1000).subscribe(() => {
      this.countTimeDifference();
    });
  }

  svgUpdater() {
    const max = 251.2;

    let formattedValue = this.counters[0].value * 100 / 60;
    let val = (max * formattedValue) / 100;
    this.counters[0].strokeDashArray = `${val},${max - val}`;
    formattedValue = this.counters[1].value * 100 / 60;
    val = (max * formattedValue) / 100;
    this.counters[1].strokeDashArray = `${val},${max - val}`;
    formattedValue = this.counters[2].value * 100 / 24;
    val = (max * formattedValue) / 100;
    this.counters[2].strokeDashArray = `${val},${max - val}`;
    formattedValue = this.counters[3].value * 100 / 15;
    val = (max * formattedValue) / 100;
    this.counters[3].strokeDashArray = `${val},${max - val}`;
  }

  ngOnDestroy() {
    this.dateChecker?.unsubscribe();
  }

  countTimeDifference() {
    if (this.totalSeconds > 0) {

      --this.counters[0].value;

      if (this.counters[1].value >= 0 && this.counters[0].value < 0) {

        this.counters[0].value = 59;
        --this.counters[1].value;
      }

      if (this.counters[3].value >= 0 && this.counters[2].value < 0) {

        this.counters[2].value = 23;
        --this.counters[3].value;
      }

      if (this.counters[2].value >= 0 && this.counters[1].value < 0) {

        this.counters[1].value = 59;
        --this.counters[2].value;
      }

      --this.totalSeconds;
      this.svgUpdater();
    }
    else {
      this.counters.map(counter => counter.value = 0)
      this.dateChecker?.unsubscribe();
      this.end.emit()
    }
  }
}
