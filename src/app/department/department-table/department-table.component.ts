import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../shared/department';
import { DepartmentService } from '../shared/department.service';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {
  showDisplay: boolean;
  departmentList: Department[] = [
    // {departmentCode: 'RD', departmentName: 'Redcross', province: 'Bangkok', budget: 1000, status: 'Y', telephone: '02-533-5533'},
    // {departmentCode: 'UN', departmentName: 'UNION', province: 'Nontaburi', budget: 10000, status: 'N', telephone: '02-323-4444'},
    // {departmentCode: 'PD', departmentName: 'Predation', province: 'Jordan', budget: 49000, status: 'Y', telephone: '061-555-111'},
    // {departmentCode: 'JP', departmentName: 'Jpion', province: 'Americanburi', budget: 5000, status: 'N', telephone: '091-422-3333'},
    // {departmentCode: 'OU', departmentName: 'Oubuddo', province: 'Ratchaburi', budget: 200000, status: 'Y', telephone: '061-235-0555'}
  ];
  displayDialog: boolean;
  @ViewChild('departmentform') form: DepartmentFormComponent;
  constructor(public service: DepartmentService) {
    this.service.loadDepartmentList().subscribe(val => console.log(val));
    // console.log('table');
  }

  ngOnInit() {
    this.query();
  }

  query(condition?: any) {
    this.service
      .loadDepartmentList(condition)
      .subscribe(response => (this.departmentList = response));
  }
  onRowSelect(event: any) {
    console.log(event.data);
    const selectableRow = { ...event.data };
    const telephoneList = selectableRow.telephone.split(/\s*\,\s*/);
    selectableRow.telephone = telephoneList;
    // const loop = telephoneList.length - this.departmentList.telephoneFormArray.length;
    while (this.form.addedTelephoneFormArrayCtrl.length !== 0) {
      this.form.addedTelephoneFormArrayCtrl.removeAt(0);
    }

    for (const tel of telephoneList) {
      this.form.addedTelephoneFormArrayCtrl.push(
        new FormControl(null, [Validators.maxLength(11), Validators.required])
      );
    }
    this.form.registerForm.patchValue(selectableRow);
    this.displayDialog = true;
    // setTimeout(() => {
    //   this.form.registerForm.patchValue(selectableRow);
    // }, 500);
  }

  updateSelectedRow(payload: any) {
    payload.telephone = payload.telephone.join(', ');
    if (payload.departmentCode){
    this.service.editDepartment(payload).subscribe(response => {
      const index = this.departmentList.findIndex(department => {
        return department.departmentCode === payload.departmentCode;
      });
      this.displayDialog = false;
      this.departmentList[index] = payload;
    });
  } else {
    this.service.addDepartment(payload).subscribe(response => {
      this.displayDialog = false;
      this.departmentList.push(response);
    });
  }
  }
  deleteDepartment(code: string) {
    this.service.deletDepartMent(code).subscribe(response => {
      const index = this.departmentList.findIndex(
        department => department.departmentCode === code
      );
      this.departmentList.splice(index, 1);
    });
  }
  addItem(payload: any) {
    // เปิด dialog
    this.displayDialog = true;
    // ล้าง form (จาก ViewChild)
    this.form.registerForm.reset({status: 'Y', remark: {value: '', disabled: true}});
  }
}

