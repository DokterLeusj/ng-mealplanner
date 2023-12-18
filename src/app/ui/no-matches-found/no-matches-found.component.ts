import {Component, Input} from '@angular/core';
import {InfoComponent} from "../info/info.component";

@Component({
    selector: 'app-no-matches-found',
    standalone: true,
    imports: [
        InfoComponent
    ],
    templateUrl: './no-matches-found.component.html',
    styleUrl: './no-matches-found.component.css'
})
export class NoMatchesFoundComponent {
    @Input()
    name!: string;

    subTextArr: string[] = [
        `There are no ${this.name} matching your current filters.`,
        `Try removing some to get better results.`,
        `Happy searching !`
    ]
    ;

}
