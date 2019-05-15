import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DepartmentService } from '../shared/department.service';
import { Key } from 'protractor';
import { Table } from 'primeng/table';
import { DepartmentTableComponent } from '../department-table/department-table.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [DepartmentService]
})
export class SearchComponent implements OnInit {
  @Input() topic = 'Search Department';
  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();

  enableRemark = true;
  departmentForm = new FormGroup({
    departmentName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), this.disValidator('Fuck')]),
    province: new FormControl(null),
    budgetFrom: new FormControl(null, Validators.pattern(/^[0-9]+$/)),
    budgetTo: new FormControl(null, Validators.pattern(/^[0-9]+$/)),
    status: new FormControl('Y'),
    telephone: new FormControl(null, Validators.pattern(/^\d+$/)),
    remarkInput: new FormControl({value: null, disabled: true}, Validators.maxLength(10))
  });
  cities1: SelectItem[];
  constructor() {
    this.cities1 = [
      {label: 'None', value: null},
      {label: 'Bangkok', value: {id: 1, name: 'Bangkok', code: 'Bk'}},
      {label: 'Chonburi', value: {id: 2, name: 'Chonburi', code: 'Ch'}},
  ];
  }

  
  Search() {
    console.log('Sr');
    // console.log(this.departmentForm.getRawValue());
    // this.topic = 'Click Search';
    if (this.departmentForm.valid) {
      const formGroupRawValue = this.departmentForm.getRawValue();
      const condition = {};
      Object.keys(formGroupRawValue).forEach( key => {
        if (formGroupRawValue[key]) {
          condition[key] = formGroupRawValue[key];
        }
      });
      this.search.emit(condition);
    } else {
      Object.values(this.departmentForm.controls).forEach(formControl => {
        formControl.markAsTouched();
      });
    }
  }
  Cancel() {
    console.log('Cn');
    this.departmentForm.reset();
    // this.topic = 'Click Cancel';
    this.cancel.emit();
  }
  checkStatus(statusValue: string, remark: HTMLInputElement) {
    if (statusValue === 'Y' ) {
      // remark.value = '';
      this.departmentForm.get('remarkInput').setValue(null);
      this.departmentForm.get('remarkInput').disable();
    } else {
      this.departmentForm.get('remarkInput').enable();
    }
    console.log('Status ' + statusValue);
  }
  // checkStatus2(statusValue: string) {
  //   console.log('Deactive ' + statusValue);
  // }
  ngOnInit() {
    // this.departmentForm.get('department');
  }

  disValidator(word: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
    const departmentName: string = control.value;

    if (departmentName && departmentName.indexOf(word) !== -1) {
      return {fuck: true};
    }
// ถ้า return เป็น object จะหมายถึง validate ไม่ผ่าน
// ถ้า return null หมายถึง validate ผ่าน
    return null;
  };
  }
}
