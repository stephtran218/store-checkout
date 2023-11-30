//1. Create variables for barcode input, "Add to Cart" button, cart items, and "Checkout" Button
const inputElement = document.getElementById("barcodeInput") 
const addButtonElement = document.getElementById("addCartButton")
const itemsList = document.getElementById("cartItems")
const checkoutButtonElement = document.getElementById("checkoutButton")
const cart = document.getElementById("cart")
const totalElement = document.getElementById("total")
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
    "":{
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

    if(inventory.hasOwnProperty(barcodeInput)){
        let itemInfo = inventory[barcodeInput]
        let numOfItems = quantityInput;
        console.log (quantityInput)

        let tempPrice = (numOfItems) * parseFloat(itemInfo.price);
        console.log (tempPrice)

        updateTotal(tempPrice);
        
        const itemElement = document.createElement("div")
        itemElement.classList.add("items");

        const itemLabel = document.createElement("p");
        
        itemLabel.innerText = itemInfo.itemName;
        const itemPrice = document.createElement("p");
        itemPrice.innerText = itemInfo.price;
        const itemQuantity = document.createElement("p");
        itemQuantity.innerText = numOfItems

        itemElement.appendChild(itemLabel);
        itemElement.appendChild(itemPrice);
        itemElement.appendChild(itemQuantity);

        cart.appendChild(itemElement);
        
    }
    
 }

 function updateTotal (tempPrice){
    runningTotal += tempPrice;
    totalElement.innerText = "Total: $" + runningTotal;

 }
 
 document.getElementById('addCartButton').addEventListener('click', addToCart);
