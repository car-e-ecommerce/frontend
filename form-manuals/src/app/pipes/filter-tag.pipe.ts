import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTag'
})
export class FilterTagPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultProduct = [];
    for (const product of value) {
      if (product.codigo.indexOf(arg) > -1) {
        console.log('sip');
      }
    }
  }
}
