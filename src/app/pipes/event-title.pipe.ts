import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventTitle',
  standalone: true
})
export class EventTitlePipe implements PipeTransform {

  transform(value: string, limit = 7, ellipsis = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }

}
