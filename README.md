# ng-async-compute

This is a very early project. Extensive testing and documentation on the way.

Compute combinations of observables with non-observables without subscribing or logic in the template.

## Example
### app.component.ts
```typescript
import { Component, OnInit } from "@angular/core";
import { of, timer, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { compute, Compute } from "ng-async-compute";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  timedToggle$: Observable<boolean>;
  name$: Observable<string>;

  userToggle = false;
  
  descriptionOfState: Compute<string>;

  ngOnInit() {
    this.name$ = of("Bob");
    this.timedToggle$ = timer(1000, 1000).pipe(
      map(n => (n % 2 ? true : false))
    );

    this.descriptionOfState = compute(
      this.name$,
      this.timedToggle$,
      (name, timeToggle) =>
        `name is ${name}, userToggle is ${this.userToggle}, and timedToggle is ${timeToggle}`
    );
  }

  clickToggleButton() {
    this.userToggle = !this.userToggle;
  }
}
```
### app.component.html
```html
<button (click)="clickToggleButton()">User Toggle</button>
<br><br>
<div>
  {{ descriptionOfState | asyncCompute }}
</div>
```
