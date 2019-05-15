import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { SearchComponent } from './search/search.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { DepartmentTableComponent } from './department-table/department-table.component';
import {TableModule} from 'primeng/table';
import { StatusPipe } from './shared/status.pipe';
import { DepartmentService } from './shared/department.service';
import {HttpClientModule} from '@angular/common/http';
import { DepartmentFormComponent } from './department-form/department-form.component';
import {DialogModule} from 'primeng/dialog';
import { EmptyDefaultPipe } from './empty-default.pipe';


@NgModule({
  declarations: [DepartmentComponent, SearchComponent, DepartmentTableComponent, StatusPipe, DepartmentFormComponent, EmptyDefaultPipe],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    RadioButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    TableModule,
    HttpClientModule,
    DialogModule
  ],
  exports: [DepartmentComponent],
  providers: [DepartmentService]
})

export class DepartmentModule { }
