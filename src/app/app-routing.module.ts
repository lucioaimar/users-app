import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  //Here we could use a parent route that in it's component contains an outlet and allows to have these pages inside one menu, with a header for example
  { path: 'list', component: UserListComponent },
  { path: 'edit/:id', component: UserFormComponent },
  { path: 'new', component: UserFormComponent },
  // otherwise redirect to user list
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
