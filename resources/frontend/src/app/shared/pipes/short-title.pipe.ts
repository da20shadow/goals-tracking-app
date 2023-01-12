import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTitle'
})
export class ShortTitlePipe implements PipeTransform {

  transform(title: string, ...args: unknown[]): unknown {
    return title.substring(0,25) + '...';
  }

}
