//1. Create variables for barcode input, "Add to Cart" button, cart items, and "Checkout" Button
const inputElement = document.getElementById("barcodeInput") 
const addButtonElement = document.getElementById("addCartButton")
const itemsList = document.getElementById("cartItems")
const checkoutButtonElement = document.getElementById("checkoutButton")
const cart = document.getElementById("cart")
const totalElement = document.getElementById("total")
const taxedTotalElement = document.getElementById("totalWithTax")
var runningTotal = 0;

//2. Create object to hold the barcode, item name, and price
const inventory = {

    "689145740844":{   
        itemName: "JavaScript Textbook",
        price: "34.95"
    },
    "4549292070248":{
        itemName: "Xerox Paper",
        price: "10.99"
    },
    "092265222983":{
        itemName:"First Aid Kit",
        price:"20.99"
    },
    "X002ELVL3J":{
        itemName:"Box of Pencils (50ct.)",
        price: "15.99"
    },
    "686024002468":{
        itemName:"Sanitizing Wipes",
        price: "10.99"
    },
    "860004186236":{
        itemName: "N95 Face Masks",
        price: "15.99"
    },
    "036000214000":{
        itemName: "Kleenex",
        price: "3.99"
    },
    "8809693254156":{
        itemName: "Hand Sanitizer",
        price: "7.99"
    },
    "036500060480":{
        itemName:"Printer Paper",
        price: "9.99"
    },
    "085014561877":{
        itemName: "Brush Pens",
        price: "10.99"
    },
    "X0032YGP2T":{
        itemName: "Multiport Adapter",
        price: "25.99"
    },
    "B07G6JT1XS":{
        itemName: "Scissors (20ct.)",
        price: "23.99"
    },
    "9780134682334":{
        itemName: "iOS Programming Textbook",
        price: "119.99"
    },
    "718103230759":{
        itemName: "Spiral Notebook",
        price: "1.99"
    },
}


//This function will add the scanend item to the cart
 function addToCart (){
    //This takes the barcode as the input
    const barcodeInput = document.getElementById("barcodeInput").value;
    //This will take count of the quantity of the items
    const quantityInput = document.getElementById("quantity").value;

    //Once the barcode is scanned, the hasOwnProperty will look through the objects and find it
    if(inventory.hasOwnProperty(barcodeInput)){
        let itemInfo = inventory[barcodeInput]
        let numOfItems = quantityInput;

        let tempPrice = (numOfItems) * parseFloat(itemInfo.price)

        //This is calling the function updateTotal to add up the expenses as things get added to the cart
        checkIfInCart(itemInfo);
        let foundItem = checkIfInCart(itemInfo);

        //Once the code finds the item that was already scanned and in the cart, it will find the old quantity and change it with a new number that added the old with the new/updated amount
        if(foundItem){
            let oldQuantity = foundItem.querySelector(".quantityOfItem").innerText

            //This sets the new and old quantities as integers
            let newQuantity = parseInt(oldQuantity) + parseInt(numOfItems);

            //This changes the text from the old quantity with the new one
            foundItem.querySelector(".quantityOfItem").innerText = newQuantity;

            //This will update the price with the updated quantity
            updateTotal(tempPrice);

            //This returns the new information
            return;
        }
            //This calls the function updateTotal and calculates the total of the current items in cart without tax
            updateTotal(tempPrice);
        
        
        //This creates a div for the item that will appear on the cart 
        const itemElement = document.createElement("div")
        //This creates a class for the scanned items the div created in line 90
        itemElement.classList.add("items");

        //This creates a p element so that the name of the item can appear on the shopping cart list
        const itemLabel = document.createElement("p");
        itemLabel.classList.add("nameOfItem");
        
        //This changes the text to the item's name on the list of things in the cart
        itemLabel.innerText = itemInfo.itemName;
        //This creates a p element for the price to appear
        const itemPrice = document.createElement("p");
        itemPrice.classList.add("priceOfItem");
        //This changes the text to the item's price
        itemPrice.innerText = itemInfo.price;
        //This creates a p element for the quantity to appear 
        const itemQuantity = document.createElement("p");
        itemQuantity.classList.add("quantityOfItem");
        //This changes the text to the amount of items in the cart
        itemQuantity.innerText = numOfItems

        //This will take all the p tags created and put them all into the itemElement's div
        itemElement.appendChild(itemLabel);
        itemElement.appendChild(itemPrice);
        itemElement.appendChild(itemQuantity);

        //This makes the itemElement(price, label, quantitiy) a child of the cart 
        cart.appendChild(itemElement);
    }
 }

 //This function will check through all the items that has been scanned and in the cart
 function checkIfInCart(itemInfo){
    //This variable grabs all the info in the items class
    let itemsInCart = document.querySelectorAll(".items");

    //This for loop will go through the array itemsInCart to find and match the newly scanned item with things that are already in the cart
    for(let i = 0; i < itemsInCart.length; i++){
        let nameOfItem = itemsInCart [i].querySelector(".nameOfItem")
        
        if(itemInfo.itemName === nameOfItem.innerText)
        
        //If found, it will return the info of the item that's in the cart
        return itemsInCart[i];
    }
 }

 //This function will update the price as things get added to the cart
 function updateTotal (tempPrice){
    //The variable running total holds all the prices that are being added everytme something gets added to the cart
    runningTotal += tempPrice;
    //This changes the text so that the total can get updated with the most current price 
    totalElement.innerText = "Total: $" + runningTotal;
 }

 //This function is supposed to calculate the total including sales tax 
 function checkoutCart() {
    let salesTax = 0.0925;
    let finalTotal = runningTotal + runningTotal * salesTax;

    // Use the correct variable name here: taxedTotalElement
    taxedTotalElement.innerText = "Your grand total (including tax, 9.25%) is: $" + finalTotal.toFixed(2);

    runningTotal = 0;
}

//When the user clicks the checkoutButton, the total without tax will be calculated with the sales tax for the final total
document.getElementById("checkoutButton").addEventListener("click", checkoutCart);

// When the user clicks the add to cart button, the barcode that got scanned will be searched in the code
document.getElementById('addCartButton').addEventListener('click', addToCart);
