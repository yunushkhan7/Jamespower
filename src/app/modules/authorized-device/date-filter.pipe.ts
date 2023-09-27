import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFilter'
})

export class DateFilterPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: any, format?: string): any {
    console.log('value', value, 'typeof ', typeof value);
    console.log('format', format);

    if (!value) { console.log('Syed need to verify '); return '' }

    format = format || 'short';

    if (value !== null) {
      if (value.length == 2) {
        let data1 = typeof (value[0]) === 'object' ? this.datePipe.transform(value[0], format) : value;
        let data2 = typeof (value[1]) === 'object' ? this.datePipe.transform(value[1], format) : value;
        return data1 + ' To ' + data2
      } else {
        let data = typeof (value) === 'object' ? this.datePipe.transform(value, format) : value;
        // return value && typeof(value) === 'object' ? this.datePipe.transform(value, format) : '';
        console.log(data);
        return data;
      }
    } else {
      return '';
    }

  }

}
