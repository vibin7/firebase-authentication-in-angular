import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
      path:"",
      component: ProfileComponent
    }
  ];
  

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class ProfileModule { }
