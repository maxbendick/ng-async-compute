import { async, TestBed } from "@angular/core/testing";
import { getProjector, AsyncComputeModule } from "projects/ng-async-compute/src/public-api";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AsyncComputeModule],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe("descriptionOfState", () => {
    it("creates the correct description", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.debugElement.componentInstance as AppComponent;

      component.ngOnInit();

      // userToggle is used in the Compute's projector, so set it here.
      component.userToggle = true;

      // Test the projector function
      const projector = getProjector(component.descriptionOfState);
      const result = projector("Miles Davis", false);

      expect(result).toEqual(
        `The user's name is Miles Davis, the user toggle is true, and the timed toggle is false`
      );
    });
  });
});
