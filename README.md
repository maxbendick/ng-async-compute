# ng-async-compute

This is a very early project. Extensive testing, documentation, performance improvements, and `Compute` composition are on the way.

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
    // The view will update whenever these emit
    this.name$ = of("Bob");
    this.timedToggle$ = timer(1000, 1000).pipe(
      map(n => (n % 2 ? true : false))
    );

    // Use observed values and component properties freely
    this.descriptionOfState = compute(
      this.name$,
      this.timedToggle$,
      (name, timeToggle) =>
        `name is ${name}, userToggle is ${this.userToggle}, and timedToggle is ${timeToggle}`
    );
  }

  // This causes the view to update
  clickToggleButton() {
    this.userToggle = !this.userToggle;
  }
}
```
### app.component.html
```html
<button (click)="clickToggleButton()">User Toggle</button>

<div>
  <!-- Print the result of the function passed to `compute` -->
  {{ descriptionOfState | asyncCompute }}
</div>
```
