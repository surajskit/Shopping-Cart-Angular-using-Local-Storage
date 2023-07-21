import { jsDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {
  productDetails: any = [];
  action: any = [];
  cartItems: any = [];
  imageUrl: string[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    // console.log("cartitems, index", this.cartItems,);

    this.productDetails = JSON.parse(localStorage.getItem('productDetails') || '[]');
    // console.log("length", (this.productDetails).length);

    // Display image in the table
    for (let i = 0; i < this.productDetails.length; i++) {
      this.imageUrl.push(this.productDetails[i].image);
    }

    // Store updated productDetails array in local storage
    localStorage.setItem('productDetails', JSON.stringify(this.productDetails));
  }

  //https://stackblitz.com/edit/angular-table-add-delete-row?file=src%2Fapp%2Ftable%2Ftable.component.ts
  
  deleteRow(row: any) {
    var delBtn = confirm("Do you want to delete?");
    if (delBtn) {
      // console.log("id",this.productDetails[row].id);
      // console.log("id",this.cartItems[row].id, 'row', row);
      
      // deleting corresponding cart items 
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      console.log("cartitems, index", this.cartItems, "product id", this.productDetails[row].id);

      // Find the corresponding item in cartItems
      const filteredItems = this.cartItems.filter((item: any) => item.id !== (this.productDetails[row].id) );
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));

      // Remove item from productDetails
      this.productDetails.splice(row, 1);
      
      //...................................................
      // Remove corresponding image URL from imageUrl array
      this.imageUrl.splice(row, 1);

      // Update local storage
      localStorage.setItem('productDetails', JSON.stringify(this.productDetails));
      localStorage.setItem('imageUrl', JSON.stringify(this.imageUrl));
      //....................................................

    }
  }  
  
  edit(product: any, i: number) {
    localStorage.setItem('edit_table', JSON.stringify(product));
    //navigate to the AddProduct page 
    this.router.navigate(
      ['/AddProduct'],
      {
        queryParams: { page: 'edit', index: i }
      }
    );
    console.log("edit data 1 ==");
  }

}
