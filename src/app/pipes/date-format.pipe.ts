import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): any {
    const dateParts = value.split('/');
    // Reorder the date parts to DD/MM/YYYY format
    // const formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
    // return formattedDate;
  }
}
