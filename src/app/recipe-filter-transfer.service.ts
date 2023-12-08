import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeFilterTransferService {
  private recipeFilterSource=new Subject<any>();
  filter=this.recipeFilterSource.asObservable();
  sendFilter(data:any){
    this.recipeFilterSource.next(data);
  }


  constructor() { }
}
