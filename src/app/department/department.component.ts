import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { DepartmentTableComponent } from './department-table/department-table.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @Input() hp = 0;
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();
  @ViewChild('departmentTable') departmantTable: DepartmentTableComponent;
  dp = 100;
  constructor() {
    console.log('constructor work');
  }

  ngOnInit() {
    console.log('ngOnInit work');
  }
  incre() {
    console.log('....');
    this.hp++;
    this.increase.emit(this.hp);
  }
  decre() {
    console.log('----');
    this.hp -= 2;
    this.decrease.emit(this.hp);
  }
  Cisearch() {
    console.log('This button is Search');
  }
  onConditionSearch(condition: any) {
    // console.log('search condition ', condition);
    this.departmantTable.query(condition);
  }
  DisplayTable() {
    if (this.departmantTable.showDisplay === true) {
      this.departmantTable.showDisplay = false;
    } else {
      this.departmantTable.showDisplay = true;
    }
  }
}
