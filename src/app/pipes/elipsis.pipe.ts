import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elipsis'
})
export class ElipsisPipe implements PipeTransform {

  transform(value: string, limit: number = 22, ellipsis: string = '...'): string {
    if (!value) {
      return '';
    }

    return value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }

}
