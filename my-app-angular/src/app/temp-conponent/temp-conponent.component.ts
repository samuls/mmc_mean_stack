import { Component } from '@angular/core';

@Component({
  selector: 'app-temp-conponent',
  templateUrl: './temp-conponent.component.html',
  styleUrls: ['./temp-conponent.component.css']
})
export class TempConponentComponent {
  celsius = 0;
  Fahrenheit = this.celsius*9/5 + 32;

  convertToFahrenheit(){
    console.log(this.celsius);
    this.Fahrenheit = this.celsius*9/5 + 32;
    console.log(this.Fahrenheit);
  }
}
