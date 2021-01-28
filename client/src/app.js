console.log("Javascript file is running");
import "regenerator-runtime/runtime";
import loginUser from "./user/loginUser";
import adminUser from "./admin/adminLogin";
import mainForm from "./mainPageForm";

const appForm = `
<form id="form-App">
<header>
<h1>Welcome! to Lucky's Grocery Market</h1>
<button id="finish" type="submit">Click here to Buy</button>
<label>Please choose the items to shop from below list then:</label>
<marquee behavior="scroll" direction="left">Please check our page for more updates on groceries</marquee>
</header>
<div id="admin">
<label>For admins only</label>
<a href="#" id="myHref">Click here</a>
<label>to update Grocery Items</label>
</div>
</form>
`;

$("body").append(appForm);
$("body").append(mainForm);

$("#finish").on("click", function () {
    $("body").empty();
    $("body").append(loginUser());
});


$("#myHref").on('click', function () {
    $("body").empty();
    $("body").append(adminUser());
});



// const fruitsObject = [
//     { id: 0, Name: "Apple", Price: 5, Quantity: 0, Imag: "./images/apple.jpeg" },
//     { id: 1, Name: "Banana", Price: 3, Quantity: 0, Imag: "./images/banana.png" },
//     { id: 2, Name: "Grapes", Price: 9, Quantity: 0, Imag: "./images/grape.png" },
//     { id: 3, Name: "Pear", Price: 5, Quantity: 0, Imag: "./images/pear.png" },
//     { id: 4, Name: "Mango", Price: 3, Quantity: 0, Imag: "./images/mango.jpeg" },
// ];
// const vegetablesObject = [
//     { id: 0, Name: "Carrot", Price: 2, Quantity: 0, Imag: "./images/carrot.jpeg" },
//     { id: 1, Name: "Capsicum", Price: 7, Quantity: 0, Imag: "./images/Capsicum.jpeg" },
//     { id: 2, Name: "Cucumber", Price: 2, Quantity: 0, Imag: "./images/cucumber.jpeg" },
//     { id: 3, Name: "Spinach", Price: 7, Quantity: 0, Imag: "./images/spinach.jpeg" },
//     { id: 4, Name: "Potato", Price: 4, Quantity: 0, Imag: "./images/potato.jpeg" },
// ];

// const dairyObject = [
//     { id: 0, Name: "Butter", Price: 5, Quantity: 0, Imag: "./images/butter.jpeg" },
//     { id: 1, Name: "Cheese", Price: 10, Quantity: 0, Imag: "./images/cheese.png" },
//     { id: 2, Name: "Milk", Price: 3, Quantity: 0, Imag: "./images/milk.png" },
//     { id: 3, Name: "Eggs", Price: 7, Quantity: 0, Imag: "./images/eggs.jpeg" },
//     { id: 4, Name: "Yogurt", Price: 6, Quantity: 0, Imag: "./images/yogurt.jpeg" },
// ];

// const grainsObject = [
//     { id: 0, Name: "Bread", Price: 4, Quantity: 0, Imag: "./images/bread.jpeg" },
//     { id: 1, Name: "Barley", Price: 12, Quantity: 0, Imag: "./images/barley.png" },
//     { id: 2, Name: "Rice", Price: 12, Quantity: 0, Imag: "./images/rice.jpeg" },
//     { id: 3, Name: "Oats", Price: 6, Quantity: 0, Imag: "./images/oats.jpeg" },
//     { id: 4, Name: "Pasta", Price: 4, Quantity: 0, Imag: "./images/pasta.jpeg" },
// ];

// const meatObject = [
//     { id: 0, Name: "Chicken", Price: 6, Quantity: 0, Imag: "./images/chicken.jpeg" },
//     { id: 1, Name: "Fish", Price: 19, Quantity: 0, Imag: "./images/fish.png" },
//     { id: 2, Name: "Goat", Price: 22, Quantity: 0, Imag: "./images/goat.jpeg" },
//     { id: 3, Name: "Lamb", Price: 21, Quantity: 0, Imag: "./images/lamb.png" },
//     { id: 4, Name: "Prawns", Price: 15, Quantity: 0, Imag: "./images/prawn.jpeg" },
// ];

// const products = {
//     Fruits: fruitsObject,
//     Vegetables: vegetablesObject,
//     Dairy: dairyObject,
//     Grains: grainsObject,
//     Meat: meatObject,
// };