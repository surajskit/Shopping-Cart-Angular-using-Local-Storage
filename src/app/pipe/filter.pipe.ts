import { jsDocComment } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      console.log("items", items);
      return items;
    }
  
    searchText = searchText.toLowerCase();
  
    return items.filter(item =>
      item.name.toLowerCase().includes(searchText) ||
      item.currency.toLowerCase().includes(searchText) ||
      item.price.toString().includes(searchText) ||
      item.gender.toLowerCase().includes(searchText)
    );
  }
  
//https://jhapriti09.medium.com/custom-search-filter-pipe-for-table-search-in-angular-10-4b8a0f42513d
  
// transform(value: any, args?: any): any {
  //   if (!value) return null;
  //   console.log("'dsafasdf", value);
  //   if (!args) return value;
  //   console.log(args);
  //   args = args.toLowerCase();
  //   return value.filter(function (item: any) {
  //     return JSON.stringify(item).toLocaleLowerCase().includes(args);
  //   });
  // }

}
