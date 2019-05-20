import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  wordList = [];
  word = [];
  typed: string;
  isRight = 0;
  // private randNumber = RandomSource();

  constructor(private platform: Platform,
              private http: HttpClient
              ) {}

  async ngOnInit() {
    await this.platform.ready();
    this.readCsvData();
  }


  private readCsvData() {
    this.http.get('assets/de/unregel_verben.csv',
        {responseType: 'text'})
        .subscribe(data => this.parseData(data));
  }

  private randomN() {
    return Math.floor(Math.random() * this.wordList.length);
  }
  private parseData(data) {
    const csv = data || '';
    const lines = csv.split('\n');
    lines.forEach( (l, n ) => {
      const word = l.split(',');
      this.wordList.push( word );
    });
    this.next();
  }

  next() {
    setTimeout(() => {
      this.isRight = 0;
    }, 900);
    this.word = this.wordList[this.randomN()];
  }

  typing() {
    const check = this.word[2].split(' ')[0];
    console.log('checking ', check, this.typed);
    if (check === this.typed) {
      console.log('Yeah is correct ', check);
      this.isRight = 1;
      this.typed = '';
      this.next();
      return;
    }
    if ( check.length <= this.typed.length) {
      console.log('Oh no is incorrect ', check);
      this.isRight = -1;
    }
  }
}
