import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform
} from "@angular/core";
import { combineLatest, Observable, Subscription } from "rxjs";

export type Projector<A> = (...args: any[]) => A;

type Compute1<A, Result> = [Observable<A>, (a: A) => Result];

type Compute2<A, B, Result> = [
  Observable<A>,
  Observable<B>,
  (a: A, b: B) => Result
];

type Compute3<A, B, C, Result> = [
  Observable<A>,
  Observable<B>,
  Observable<C>,
  (a: A, b: B, c: C) => Result
];

type Compute4<A, B, C, D, Result> = [
  Observable<A>,
  Observable<B>,
  Observable<C>,
  Observable<D>,
  (a: A, b: B, c: C, d: D) => Result
];

type Compute5<A, B, C, D, E, Result> = [
  Observable<A>,
  Observable<B>,
  Observable<C>,
  Observable<D>,
  Observable<E>,
  (a: A, b: B, c: C, d: D, e: E) => Result
];

export type Compute<Result> =
  | Compute1<any, Result>
  | Compute2<any, any, Result>
  | Compute3<any, any, any, Result>
  | Compute4<any, any, any, any, Result>
  | Compute5<any, any, any, any, any, Result>;

// The `compute` function helps construct `Compute`s with convenient type hints for the programmer.

export function compute<A, Result>(
  ...compute: Compute1<A, Result>
): Compute1<A, Result>;
export function compute<A, B, Result>(
  ...compute: Compute2<A, B, Result>
): Compute2<A, B, Result>;
export function compute<A, B, C, Result>(
  ...compute: Compute3<A, B, C, Result>
): Compute3<A, B, C, Result>;
export function compute<A, B, C, D, Result>(
  ...compute: Compute4<A, B, C, D, Result>
): Compute4<A, B, C, D, Result>;
export function compute<A, B, C, D, E, Result>(
  ...compute: Compute5<A, B, C, D, E, Result>
): Compute5<A, B, C, D, E, Result>;
export function compute(...compute: never) {
  return compute;
}

const withoutLast = <A>(xs: A[]) => xs.slice(0, xs.length - 1);

export const getProjector = <A>(compute: Compute<A>) =>
  compute[compute.length - 1] as Projector<A>;

@Pipe({ name: "asyncCompute", pure: false })
export class AsyncComputePipe<A> implements PipeTransform, OnDestroy {
  projector: Projector<A>;
  subscription: Subscription;
  observableValues: any[];

  constructor(private ref: ChangeDetectorRef) {}

  init(compute: Compute<A>) {
    this.projector = getProjector(compute);
    const observables = withoutLast(compute);

    this.subscription = combineLatest(...observables).subscribe(
      observableValues => {
      this.observableValues = observableValues;
      this.ref.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  transform(compute: Compute<A>): A | undefined {
    if (!compute) return;
    if (!this.projector) this.init(compute);
    if (!this.observableValues) return;
    return this.projector(...this.observableValues);
  }
}
