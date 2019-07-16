import { Component, OnInit } from "@angular/core";
import { compute, Compute } from "projects/ng-async-compute/src/public-api";
import { Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  timedToggle$: Observable<boolean>;
  name$: Observable<string>;

  userToggle = false;

  // Non-lazy way - see ngOnInit
  descriptionOfState: Compute<string>;

  // Lazy way - pass functions that return observables.
  // These functions get called after ngOnInit
  descriptionOfStateLazy = compute(
    () => this.name$,
    () => this.timedToggle$,
    (name, timeToggle) =>
      `The user's name is ${name}, the user toggle is ${
        this.userToggle
      }, and the timed toggle is ${timeToggle}`
  );

  ngOnInit() {
    this.name$ = of("Miles");
    this.timedToggle$ = timer(1000, 1000).pipe(
      map(n => (n % 2 ? true : false))
    );

    this.descriptionOfState = compute(
      this.name$,
      this.timedToggle$,
      (name, timeToggle) =>
        `The user's name is ${name}, the user toggle is ${this.userToggle}, and the timed toggle is ${timeToggle}`
    );
  }

  clickToggleButton() {
    this.userToggle = !this.userToggle;
  }
}
