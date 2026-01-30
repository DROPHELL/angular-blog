import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe<T> implements PipeTransform {

  transform(items: T[], page: number, perPage: number): T[] {
    if (!items || items.length === 0) return [];

    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }
}
