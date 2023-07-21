import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit {
  @ViewChild('addProductForm')
  addProductForm!: NgForm;
  defaultname = "";
  defaultprice = "";
  defaultquantity = "";
  defaultgender = "";
  defaultcurrency = "";
  defaultcolor = "";
  defaultimage = "";

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const firstParam: any = this.route.snapshot.queryParamMap.get('page');// Get the page from the query parameters
    const index: any = this.route.snapshot.queryParamMap.get('index'); // Get the index from the query parameters
    // console.log(firstParam, "page");
    if (firstParam) {
      this.updateTable(index); // Pass the index to the updateTable function
    }
    else {
      localStorage.removeItem('edit_table');
    }
  }

  updateTable(index: any) {
    // console.log("index ", index);
    // Retrieve data from localStorage
    const updateData = JSON.parse(localStorage.getItem('edit_table')!);
    console.log("edit_table", updateData);

    // Set the default form values
    this.defaultname = updateData.name;
    this.defaultprice = updateData.price;
    this.defaultquantity = updateData.quantity;
    this.defaultgender = updateData.gender;
    this.defaultcurrency = updateData.currency;
    this.defaultcolor = updateData.color;
    this.defaultimage = updateData.image;

    // Temporarily disable image validation
    setTimeout(() => {
      const imageControl = this.addProductForm.form.get('image');
      if (imageControl) {
        imageControl.clearValidators();
        imageControl.updateValueAndValidity();
      }
    });
  }

  //save button function
  productDetails(form: NgForm) {
    if (form.invalid) {
      return;
    }

  //  https://www.educative.io/answers/how-to-build-an-image-preview-using-javascript-filereader
  // https://www.webmound.com/convert-images-data-urls-javascript/

    // Retrieve the uploaded file
    const fileInput = document.getElementById('forimage') as HTMLInputElement;

    // fileInput.value=''; // Set the value to an empty string
    const file: File | undefined = fileInput?.files?.[0]; // to accept only one file

    // Check if a file was selected
    if (file) {
      // Create a new FileReader to read the file
      const reader = new FileReader();

      // Set up the onload event handler to handle the file reading
      reader.onload = (e: any) => {
        // Get the image URL from the FileReader result
        const imageUrl = e.target.result;

        // Update the form value with the image URL
        form.value.image = imageUrl;
        // this.selectedImage = imageUrl;

        // Continue with saving the product details
        this.saveProductDetails(form);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    } else {
      // No file selected, proceed with saving the product details
      this.saveProductDetails(form);
    }
  }

  saveProductDetails(form: NgForm) {
    // Retrieve the existing cartItems from the local storage
    let cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const editMode = this.route.snapshot.queryParamMap.get('page') === 'edit';
    const index = this.route.snapshot.queryParamMap.get('index');
    let productDetails: any[] = JSON.parse(localStorage.getItem('productDetails') || '[]');
    console.log("Existing cartItems:ewrefergfrewf", cartItems);
 
    //For handling the productDetails when the form is updated ...................
    if (editMode && index !== null) {
      // Edit mode: Retain the existing unique ID
      const parsedIndex = parseInt(index);
      if (parsedIndex >= 0 && parsedIndex < productDetails.length) {
        const existingProduct = productDetails[parsedIndex];
        console.log("existingProduct",existingProduct);
        
        const productData = {
          ...existingProduct, // Retain existing properties
          name: form.value.name,
          price: form.value.price,
          quantity: form.value.quantity,
          gender: form.value.gender,
          currency: form.value.currency,
          color: form.value.color,
          image: form.value.image,
        };
        console.log("productDataproductData",productData);
        
        //For handling the cartItems when the form is updated ...................
        const replaceCartItems = [];
        // console.log(productData, 'doc', cartItems);
        for (let item of cartItems) {
          if (item.id === productData.id) {
            let alterObj = {};
            if (item.minQuantity < productData.quantity) {
              console.log(productData.quantity, 'productData.minQuantity', item.minQuantity);

              alterObj = {
                ...productData,
                minQuantity: item.minQuantity
              }
              console.log(alterObj, 'alterObj');
            }
            else 
            {
              console.log(productData.minQuantity, 'productData.minQuantity');

              alterObj = {
                ...productData,
                minQuantity: productData.quantity
              }
              console.log(alterObj, 'less');
            }
            replaceCartItems.push(alterObj)
          }
          else replaceCartItems.push(item);
        }
        localStorage.setItem("cartItems", JSON.stringify(replaceCartItems));
        //.....................................................................................
        productDetails[parsedIndex] = productData;
      }
    }
    else {
      // Add mode: Generate a new unique ID
      const uniqueId = uuidv4(); // Generate a unique ID
      const productData = {
        name: form.value.name,
        price: form.value.price,
        quantity: form.value.quantity,
        gender: form.value.gender,
        currency: form.value.currency,
        color: form.value.color,
        image: form.value.image,
        id: uniqueId,
      };
      productDetails.unshift(productData);
    }
    localStorage.setItem('productDetails', JSON.stringify(productDetails)); // Update the local storage    

    // Reset the form after saving the data
    form.resetForm();
    alert("Item added successfully");
  }

}


