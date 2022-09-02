import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SimulationComponent } from './simulation/simulation.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'simulation', component: SimulationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
