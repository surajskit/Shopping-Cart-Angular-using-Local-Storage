import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
{path:'Home',component:HomePageComponent},
{path:'AddProduct', component:AddProductPageComponent},
{path:'ProductDetails', component:ProductDetailsPageComponent},
{path:'Shopping', component:ShoppingPageComponent},
{path:'Cart',component:CartPageComponent},
{path:'', redirectTo:'/Home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
