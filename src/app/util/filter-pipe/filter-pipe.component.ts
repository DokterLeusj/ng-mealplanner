import {Component, PipeTransform} from '@angular/core';

@Component({
  selector: 'app-filter-pipe',
  standalone: true,
  imports: [],
  templateUrl: './filter-pipe.component.html',
  styleUrl: './filter-pipe.component.css'
})
export class FilterPipeComponent implements PipeTransform {
  transform(initialArr: any[], searchText: string): any[] {
    if(!initialArr){
      return [];
    }
    if(!searchText){
      return initialArr;
    }
    searchText=this.formatForFilter(searchText);

    return initialArr.filter(i=>this.formatForFilter(i).includes(searchText))
  }
  private formatForFilter(text:string):string{
    return text.toLowerCase();
  }

}
