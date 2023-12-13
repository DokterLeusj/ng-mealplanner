import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  @Input()
    imgSrc!: string;
  @Input()
  imgAlt!:string;
  @Input()
  titleText!: string;
  @Input()
  subText!: string[];

}
