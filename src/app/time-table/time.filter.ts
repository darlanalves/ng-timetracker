import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'time' })
export class TimeFilter implements PipeTransform {
  transform(input: string | number) {
    input = Number(input) | 0;

    const hours = Math.floor(input);
    const minutes = (input - hours) * 60;

    if (!hours && !minutes) {
      return '-';
    }
    
    if (minutes) {
      return `${hours}h ${minutes}'`;
    }

    return `${hours}h`;
  }
}