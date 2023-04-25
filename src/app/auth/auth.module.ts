import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
      path:"",
      component: AuthComponent
    }
  ];
  

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class AuthModule { }
