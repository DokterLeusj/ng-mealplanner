import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './style-page.component.html',
  styleUrl: './style-page.component.css'
})
export class StylePageComponent {
  readonly styles: Array<any>=[];

  ngOnInit():void{
    this.loadStyles();

  }
  private loadStyles() {
    let colors: Array<string> = [
      "--color-white",
      "--color-base",
      "--color-light",
      "--color-medium-light",
      "--color-medium-dark",
      "--color-dark",
    ];

    for (let color of colors) {
      for (let bgColor of colors) {
        if (color !== bgColor) {
          this.styles.push({
           css:`color:var(${color}); background-color: var(${bgColor}); `,
           text:        `${color.replace("--color-","")} on ${bgColor.replace("--color-","")}`
          });
        }
      }
    }
  }
}
