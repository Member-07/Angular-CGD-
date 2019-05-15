import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestAngular';
  searchIncrease(searchHp: number) {
    console.log('searchIncrease', searchHp); // เก็บค่า hp
  }
  seaechDecrease(searchDeHp: number) {
    console.log('searchDecrease', searchDeHp); 
  }
}
