import {Component, Input} from '@angular/core';
import {InfoComponent} from "../info/info.component";

@Component({
  selector: 'app-no-access',
  standalone: true,
    imports: [
        InfoComponent
    ],
  templateUrl: './no-access.component.html',
  styleUrl: './no-access.component.css'
})
export class NoAccessComponent {
    @Input()
    subTextArr:string[]=[];

}
