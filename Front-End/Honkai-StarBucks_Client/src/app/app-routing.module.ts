import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define the routes and export them
export const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // forRoot() sets up the routing at the root level
  exports: [RouterModule]
})
export class AppRoutingModule { }
