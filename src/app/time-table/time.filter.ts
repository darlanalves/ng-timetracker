import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'time' })
export class TimeFilter implements PipeTransform {
  transform(input: string | number) {
    if (typeof input === 'string') {
      input = parseFloat(input);
    }

    const hours = Math.floor(input);
    let minutes = Math.round((input - hours) * 60);

    if (!hours && !minutes) {
      return '-';
    }
    
    if (minutes) {
      minutes = minutes >= 45 ? 45 : minutes >= 30 ? 30 : 15;
      return `${hours}h ${minutes}m`;
    }

    return `${hours}h`;
  }
}