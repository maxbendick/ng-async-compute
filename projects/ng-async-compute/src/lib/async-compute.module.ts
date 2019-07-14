import { NgModule } from "@angular/core";
import { AsyncComputePipe } from "./pipes/async-compute/async-compute.pipe";

@NgModule({
  declarations: [AsyncComputePipe],
  imports: [],
  exports: [AsyncComputePipe]
})
export class AsyncComputeModule {}
