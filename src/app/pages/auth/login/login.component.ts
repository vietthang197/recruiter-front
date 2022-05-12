import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   emailLogin: string = '';
   passwordLogin: string = '';
   isSpinning = false;

  constructor() { }

  ngOnInit(): void {
  }

  doLogin() {
    this.isSpinning = true;
  }
}
