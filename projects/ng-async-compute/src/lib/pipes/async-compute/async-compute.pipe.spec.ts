import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AsyncComputePipe } from './async-compute.pipe';

describe('AsyncComputePipe', () => {
  // let pipe: AsyncComputePipe;
  // let fixture: ComponentFixture<NgAsyncComputeComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ NgAsyncComputeComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(NgAsyncComputeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(new AsyncComputePipe(null)).toBeTruthy();
  });
});
