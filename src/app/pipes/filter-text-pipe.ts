import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterTextPipe<T extends { title: string; text: string }>
  implements PipeTransform {

  transform(value: T[], filterText: string): T[] {
    if (!value || !filterText) {
      return value;
    }

    const text = filterText.toLowerCase();

    return value.filter(item =>
      item.title.toLowerCase().includes(text) ||
      item.text.toLowerCase().includes(text)
    );
  }
}
