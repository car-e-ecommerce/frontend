import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateFormComponent } from './components/create-formulario/createForm.component';
import { ListComponent } from './components/list/list.component';
import { EditProductComponent } from './components/edit-product/editProduct.component';

const routes: Routes = [
  { path: ':id', component: ListComponent },
  { path: 'create-management-manuals/:id', component: CreateFormComponent },
  { path: 'edit-product/:idProduct/:userId', component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
