import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';// for two way binding
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FilterPipe } from './pipe/filter.pipe'; //for filter pipe




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddProductPageComponent,
    ProductDetailsPageComponent,
    ShoppingPageComponent,
    CartPageComponent,
    FilterPipe,//for filter pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module

    ToastrModule.forRoot({
      timeOut: 5000,
      toastClass: 'ngx-toastr custom-toast',
    }),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
