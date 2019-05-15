import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
      if (value === 'Y') {
      return status =  'Active';
    } if (value === 'N') {
      return status =  'Deactive';
    } else {
      return status =  'None';
    }
  }

}
