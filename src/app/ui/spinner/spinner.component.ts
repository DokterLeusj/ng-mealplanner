import {Component, Input} from '@angular/core';
import {InfoComponent} from "../info/info.component";

@Component({
  selector: 'app-spinner',
  standalone: true,
    imports: [
        InfoComponent
    ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  @Input()
  titleText!: string;
  @Input()
  subText!: string[];
}
