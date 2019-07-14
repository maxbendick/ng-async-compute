import { Component, OnInit } from "@angular/core";
import { of, timer, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { compute, Compute } from "projects/ng-async-compute/src/public-api";

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
        `The user's name is ${name}, the user toggle is ${this.userToggle}, and the timed toggle is ${timeToggle}`
    );
  }

  clickToggleButton() {
    this.userToggle = !this.userToggle;
  }
}
