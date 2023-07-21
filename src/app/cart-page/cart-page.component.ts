import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: any = [];
  totalCost: number = 0;
  imageUrl: string[] = [];
  productDetails: any = [];
  orderPlaced: boolean = false;
  isDisabled=true;

  @ViewChild('placedOrder') placedOrder: any;
  @ViewChild('availableQuantity') availableQuantity: any;
  availablequantity = '';

  constructor(private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.productDetails = JSON.parse(localStorage.getItem('productDetails') || '[]');
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log("this.cartItems",this.cartItems);
    
    // this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.calculateTotalCost();

    // Display image in the table
    for (let i = 0; i < this.cartItems.length; i++) {
      this.imageUrl.push(this.cartItems[i].image);
    }
  }

  cancel(cart: any, row: any) {
    const existingItemIndex = this.cartItems.findIndex((item: any) => item.id === cart.id);
    if (existingItemIndex > -1) {
      this.cartItems.splice(existingItemIndex, 1);
       // Remove corresponding image URL from imageUrl array
        this.imageUrl.splice(row, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
          localStorage.setItem('imageUrl', JSON.stringify(this.imageUrl));

    console.log("selected items =", this.cartItems);

    // Recalculate total cost
    this.calculateTotalCost();
  }

  calculateTotalCost() {
    this.totalCost = 0;
    for (let cart of this.cartItems) {
      if (cart.currency == '$') {
        console.log("it is dollar");
        this.totalCost += (cart.minQuantity * cart.price * 82.00);
      }
      else {
        console.log("it is inr");
        this.totalCost += (cart.minQuantity * cart.price);
      }
    }
    console.log("total cost", this.totalCost);
  }


  plus(product: any, i: any) {
    if (product.minQuantity < product.quantity) {
      product.minQuantity++;
      const selectedQuantity = product.minQuantity;
      const existingItemIndex = this.cartItems.findIndex((item: any) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Item already exists in cart, update minQuantity
        this.cartItems[existingItemIndex].minQuantity = selectedQuantity;
      }
      else {
        // Item doesn't exist in cart, add it
        let a = this.cartItems.unshift(product);
        console.log("else", a);

      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    else if (product.minQuantity === product.quantity) {
      // alert("Only " + product.quantity + " quantities are available");
      this.availablequantity = product.quantity;
      this.showQuantityModal();
    }
  }
  //....................................................................................
  minus(event: any, product: any, row: any) {
    if (product.minQuantity > 1) {
      product.minQuantity--;
      const selectedQuantity = product.minQuantity;

      const existingItemIndex = this.cartItems.findIndex((item: any) => item.id === product.id);
      console.log("existingItemIndex=", existingItemIndex);

      if (existingItemIndex > -1) {
        // Item already exists in cart, update minQuantity
        this.cartItems[existingItemIndex].minQuantity = selectedQuantity;
        console.log("if");
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    else if (product.minQuantity == 1) {

      // Remove item from cartItems array
      const existingItemIndex = this.cartItems.findIndex((item: any) => item.id === product.id);
      if (existingItemIndex > -1) {
        this.cartItems.splice(existingItemIndex, 1);
    // Remove corresponding image URL from imageUrl array
        this.imageUrl.splice(row, 1); 
      }

      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      localStorage.setItem('imageUrl', JSON.stringify(this.imageUrl));
      this.calculateTotalCost();
    }
  }

  showSuccess() {
    this.toastr.success('Thank you for ordering!', 'Order placed!', {
      positionClass: 'toast-top-center',
    });
  }

  checkOut(cartItems: any) {
    const products = JSON.parse(localStorage.getItem('productDetails') || '[]');
    console.log(products, "Thank You For Ordering", cartItems);

    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < cartItems.length; j++) {
        if (products[i].id === cartItems[j].id) {
          products[i].quantity = products[i].quantity - cartItems[j].minQuantity;

          const remainProduct = products.filter((item: any) => item.quantity !== 0);
          localStorage.setItem("productDetails", JSON.stringify(remainProduct));
        }
      }
    }

    localStorage.removeItem('cartItems');
    this.cartItems = []; // Clear the cartItems array
    this.calculateTotalCost(); // Recalculate total cost

    // this.showSuccess();
    this.showOrderModal();
  }

  showOrderModal() {
    const modalRef = this.modalService.open(this.placedOrder);
  }

  showQuantityModal() {
    const modalRef = this.modalService.open(this.availableQuantity);
  }

}
