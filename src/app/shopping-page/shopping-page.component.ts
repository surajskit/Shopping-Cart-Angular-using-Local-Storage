import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  productDetails: any = [];
  cartItems: any = [];
  imageUrl: string[] = [];
  SearchText: string = ''; // Initialize SearchText property
  showPlusMinusBtn: boolean = false;
  availablequantity='';
  isDisabled=true;

  @ViewChild('availableQuantity') availableQuantity: any;
  constructor( private modalService: NgbModal ){}

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log("this.cartItems",this.cartItems);    
    this.productDetails = JSON.parse(localStorage.getItem('productDetails') || '[]');
  
    for (let i = 0; i < this.productDetails.length; i++) {
      this.imageUrl.push(this.productDetails[i].image);
    }
   // Add min quantity as key-value pair in each product
    this.productDetails = this.productDetails.map((product: any) => {
      const existingCartItem = this.cartItems.find((item: any) => item.id === product.id);
      if (existingCartItem) {
        product.minQuantity = existingCartItem.minQuantity;
      } 
      else {
        product.minQuantity = 1;
      }
      return product;
    });
    // Store updated productDetails array in local storage
    localStorage.setItem('productDetails', JSON.stringify(this.productDetails));
  }

 // togglePlusMinus(event: any, product: any, i: any) {
  togglePlusMinus(event: any, product: any, i: any) {
    event.target.nextElementSibling.classList.remove("d-none");
    event.target.classList.add("d-none");
  
    const selectedQuantity = product.minQuantity; 
    const existingItemIndex = this.cartItems.findIndex((item: any) => item.id === product.id);
  
    if (existingItemIndex > -1) {
      // Item already exists in cart, update minQuantity
      this.cartItems[existingItemIndex].minQuantity = selectedQuantity;
    } 
    else {
      // Item doesn't exist in cart, add it
      this.cartItems.unshift(product);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // helping for showing "plusMinusBtn" btn after refresh
  isProductInCart(product: any): boolean {
    return this.cartItems.some((item: any) => item.id === product.id);
  }
  //..........................................................................
  plus(product: any, i: any) {

    if (product.minQuantity < product.quantity) {
      product.minQuantity++;
      const selectedQuantity = product.minQuantity;
      const existingItemIndex = this.cartItems.findIndex((item: any) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Item already exists in cart, update minQuantity
        this.cartItems[existingItemIndex].minQuantity = selectedQuantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    else if (product.minQuantity === product.quantity) {
      // alert("Only " + product.quantity + " quantities are available");
      this.availablequantity=product.quantity;
      this.showQuantityModal();
    }
  }
  //....................................................................................
  minus(event: any, product: any, i: any) {
    if (product.minQuantity > 1) {
      product.minQuantity--;
      const selectedQuantity = product.minQuantity;
      const existingItemIndex = this.cartItems.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Item already exists in cart, update minQuantity
        this.cartItems[existingItemIndex].minQuantity = selectedQuantity;
      } 
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }

    else if (product.minQuantity == 1) {
      // Remove item from cartItems array
      const existingItemIndex = this.cartItems.findIndex((item: any) => item.id === product.id);
      if (existingItemIndex > -1) {
        this.cartItems.splice(existingItemIndex, 1);
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      
      // Hide the plusMinus button and show the "Add to cart" button
      event.target.parentNode.previousElementSibling.classList.remove("d-none");
      event.target.parentNode.classList.add("d-none")
    }
  }

    showQuantityModal() {
    const modalRef = this.modalService.open(this.availableQuantity);
  }

}
