import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray'
})
export class ToArrayPipe implements PipeTransform {

  transform(inputObj: object): [string, any][] {
    return Object.entries(inputObj);
  }

}
