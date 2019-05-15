import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  @Output() status = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  addedTelephoneFormArrayCtrl: FormArray;
  // @ViewChild('departmentform')departmentForm: DepartmentFormComponent;
  // telephoneFormArray: FormArray;
  registerForm = new FormGroup({
    departmentCode: new FormControl(),
    departmentName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.maxLength(50)]),
    province: new FormControl(null, Validators.required),
    // addedTelephoneFormArray: new FormArray([]) ,
    budget: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(11)]),
    status: new FormControl(null, Validators.required),
    telephone: new FormArray([new FormControl(null)], Validators.required),
    remark: new FormControl({value: '', disable: true}, [Validators.required, Validators.maxLength(255)])
  });
  cities1: SelectItem[];
  constructor() {
    this.cities1 = [
      { label: 'None', value: null },
      { label: 'Bangkok', value: 'Bangkok'},
      { label: 'Chonburi', value: 'Chonburi'}
    ];
    setTimeout(() => this.registerForm.get('status').setValue('Y'));
  }
  departmentCtrl = this.registerForm.get('departmentName');
  // addedTelephoneFormArrayCtrl = this.registerForm.get('addedTelephoneFormArray') as FormArray;
  budgetCtrl = this.registerForm.get('budget');
  remarkCtrl = this.registerForm.get('remark');
  telephoneCtrl = this.registerForm.get('telephone');
  provinceCtrl = this.registerForm.get('province');
  provinceOption = this.cities1;

  ngOnInit() {
     this.addedTelephoneFormArrayCtrl = this.registerForm.get('telephone') as FormArray;
  }
  Save() {
    // console.log('search');
    // if (this.registerForm.valid) {
      const formGroupRawValue = this.registerForm.getRawValue();
      const condition = {};
      Object.keys(formGroupRawValue).forEach(key => {
        if (formGroupRawValue[key]) {
          condition[key] = formGroupRawValue[key];
        }
      });
      this.save.emit(condition);
      // console.log();
    // } else {
    //   Object.values(this.registerForm.controls).forEach(formControl => {
    //     formControl.markAsTouched();
    //   });
    // }
  }

  Cancel() {
    console.log('cancel');
    this.cancel.emit();
    this.registerForm.reset();
  }

  Status1(checkstatus1: string, remarkInput: HTMLInputElement) {
    if (checkstatus1 === 'Y') {
      // this.DisableRemark = false;
      // remarkInput.value = '';
      this.registerForm.get('remark').setValue(null);
      this.registerForm.get('remark').disable();
    } else {
      // this.DisableRemark = null;
      this.registerForm.get('remark').enable();
    }
    // checkstatus === 'Y' ? this.DisableRemark = false : this.DisableRemark = null;
    console.log('status', checkstatus1);
    this.status.emit();

  }
  addTelephone() {
    this.addedTelephoneFormArrayCtrl.push(new FormControl('', [Validators.required, Validators.maxLength(11)]));
  }

  deletebutton(item: number) {
    this.addedTelephoneFormArrayCtrl.removeAt(item);
  }

}
