console.log("Javascript file is running");
import "regenerator-runtime/runtime";
import loginUser from "./user/loginUser";


const fruitsObject = [
    { id: 0, Name: "Apple", Price: 5, Quantity: 0, Imag: "./images/apple.jpeg" },
    { id: 1, Name: "Banana", Price: 3, Quantity: 0, Imag: "./images/banana.png" },
    { id: 2, Name: "Grapes", Price: 9, Quantity: 0, Imag: "./images/grape.png" },
    { id: 3, Name: "Pear", Price: 5, Quantity: 0, Imag: "./images/pear.png" },
    { id: 4, Name: "Mango", Price: 3, Quantity: 0, Imag: "./images/mango.jpeg" },
];

$("#fruitsList").append('<ol id="fruits"></ol>');
fruitsObject.forEach((element, i) => {
    $("#fruits").append(`<li><button class="itemNames" value=${element.Name}><img src=${element.Imag}>${element.Name}</button></li>`);
});

const vegetablesObject = [
    { id: 0, Name: "Carrot", Price: 2, Quantity: 0, Imag: "images/carrot.jpeg" },
    { id: 1, Name: "Capsicum", Price: 7, Quantity: 0, Imag: "images/Capsicum.jpeg" },
    { id: 2, Name: "Cucumber", Price: 2, Quantity: 0, Imag: "images/cucumber.jpeg" },
    { id: 3, Name: "Spinach", Price: 7, Quantity: 0, Imag: "images/spinach.jpeg" },
    { id: 4, Name: "Potato", Price: 4, Quantity: 0, Imag: "images/potato.jpeg" },
];
$("#vegetablesList").append('<ol id="vegetables"></ol>');
vegetablesObject.forEach((element, i) => {
    $("#vegetables").append(`<li><button class="itemNames" value=${element.Name}><img src=${element.Imag}>${element.Name}</button></li>`);
});
const dairyObject = [
    { id: 0, Name: "Butter", Price: 5, Quantity: 0, Imag: "images/butter.jpeg" },
    { id: 1, Name: "Cheese", Price: 10, Quantity: 0, Imag: "images/cheese.png" },
    { id: 2, Name: "Milk", Price: 3, Quantity: 0, Imag: "images/milk.png" },
    { id: 3, Name: "Eggs", Price: 7, Quantity: 0, Imag: "images/eggs.jpeg" },
    { id: 4, Name: "Yogurt", Price: 6, Quantity: 0, Imag: "images/yogurt.jpeg" },
];
$("#dairyList").append('<ol id="dairy"></ol>');
dairyObject.forEach((element, i) => {
    $("#dairy").append(`<li><button class="itemNames" value=${element.Name}><img src=${element.Imag}>${element.Name}</button></li>`);
});
const grainsObject = [
    { id: 0, Name: "Bread", Price: 4, Quantity: 0, Imag: "images/bread.jpeg" },
    { id: 1, Name: "Barley", Price: 12, Quantity: 0, Imag: "images/barley.png" },
    { id: 2, Name: "Rice", Price: 12, Quantity: 0, Imag: "images/rice.jpeg" },
    { id: 3, Name: "Oats", Price: 6, Quantity: 0, Imag: "images/oats.jpeg" },
    { id: 4, Name: "Pasta", Price: 4, Quantity: 0, Imag: "images/pasta.jpeg" },
];
$("#grainsList").append('<ol id="grains"></ol>');
grainsObject.forEach((element, i) => {
    $("#grains").append(`<li><button class="itemNames" value=${element.Name}><img src=${element.Imag}>${element.Name}</button></li>`);
});
const meatObject = [
    { id: 0, Name: "Chicken", Price: 6, Quantity: 0, Imag: "images/chicken.jpeg" },
    { id: 1, Name: "Fish", Price: 19, Quantity: 0, Imag: "images/fish.png" },
    { id: 2, Name: "Goat", Price: 22, Quantity: 0, Imag: "images/goat.jpeg" },
    { id: 3, Name: "Lamb", Price: 21, Quantity: 0, Imag: "images/lamb.png" },
    { id: 4, Name: "Prawns", Price: 15, Quantity: 0, Imag: "images/prawn.jpeg" },
];
$("#meatList").append('<ol id="meat"></ol>');
meatObject.forEach((element, i) => {
    $("#meat").append(`<li><button class="itemNames" value=${element.Name}><img src=${element.Imag}>${element.Name}</button></li>`);
});

const products = {
    Fruits: fruitsObject,
    Vegetables: vegetablesObject,
    Dairy: dairyObject,
    Grains: grainsObject,
    Meat: meatObject,
};

let numberOfItems = [];
let itemNumber = 0;
console.log(products);

//when user clicks on each item it prints those items on the page in form of table
$(".itemNames").on("click", function (event) {
    
    event.preventDefault();
    const nameOfItem = $(this).val();
    console.log("inside items click", nameOfItem);
    itemClickedValues(nameOfItem);
    

});

// pushing items clicked values into array of object(numberofItems) and increase quantity and price
const itemClickedValues = (nameOfItem) => {
    for (let i = 0; i < Object.keys(products).length; i++) {
        const valueOfKey = products[Object.keys(products)[i]];
        const result = valueOfKey.find(({ Name }) => Name === nameOfItem);
        if (result) {
            itemNumber++;
            const exist = numberOfItems.find(({ Name }) => Name === nameOfItem);
            if (exist) {
                //console.log("its here in exist:", exist);
                objIndex = numberOfItems.findIndex((exist => exist.Name == nameOfItem));
                numberOfItems[objIndex].repeated = exist.repeated + 1;
                numberOfItems[objIndex].price = exist.repeated * result.Price;
                alert(`you got ${numberOfItems[objIndex].repeated - 1} ${nameOfItem} in the list, Do you want to 1 more`);
            } else {
                const itemIdNumber = result.id;
                const itemPrice = result.Price;
                const idItemObject = { id: itemNumber, Name: nameOfItem, price: itemPrice, repeated: result.Quantity + 1 };
                numberOfItems.push(idItemObject);
            }
        }
    }
    console.log(numberOfItems);
    printResult();
}

//printing values with total price on to the table 
function printResult() {
    let sum = 0;
    $("#resultItems").empty();
    for (let i = 0; i < numberOfItems.length; i++) {
        $("#resultItems").append(`<tr>
        <td>${i + 1}</td>
        <td>${numberOfItems[i].Name}</td>
        <td>$${numberOfItems[i].price}</td>
        <td>${numberOfItems[i].repeated}
        <input type="button" value="+" class="plus" onclick="plusFunction(this)">
           <input type="button" value="-" class="minus" onclick="minusFunction(this)">
        <button onclick="deleteFunction(this)">
           <i class="fa fa-trash-o"></i></button></td></tr>`);
        const priceOf = numberOfItems[i].price;
        sum = +priceOf + sum;
    }
    $("#resultItems").append(`<tr><th></th><th>Total price:</th><th>${sum}</th>`);
}


const deleteSelectedItem = (nameOfItem) => {
    const exist = numberOfItems.find(({ Name }) => Name === nameOfItem);
    objIndex = numberOfItems.findIndex((exist => exist.Name == nameOfItem));
    numberOfItems.splice(objIndex, 1);
    alert(`${nameOfItem} is removed from the list`);
    printResult();
}

const itemRemovedValues = (nameOfItem) => {
    for (let i = 0; i < Object.keys(products).length; i++) {
        const valueOfKey = products[Object.keys(products)[i]];
        const result = valueOfKey.find(({ Name }) => Name === nameOfItem);
        if (result) {
            const exist = numberOfItems.find(({ Name }) => Name === nameOfItem);
            if (exist && exist.repeated > 1) {
                objIndex = numberOfItems.findIndex((exist => exist.Name == nameOfItem));
                numberOfItems[objIndex].repeated = exist.repeated - 1;
                numberOfItems[objIndex].price = exist.price - result.Price;
                alert(`you have only ${numberOfItems[objIndex].repeated} ${nameOfItem} in the list`);
            } else if (exist.repeated = 1) {

                deleteSelectedItem(nameOfItem);
            }
            printResult();
        }
    }
}


//deleting a row if user clicks on delete symbol
function deleteFunction(r) {
    let row = r.parentNode.parentNode.rowIndex;
    let cellItemName = document.getElementById("itemsTable").rows[row].cells[1].innerText;
    deleteSelectedItem(cellItemName);
}

//incrementing previous quantity value by 1 user clicks on + button and price as well
function plusFunction(r) {
    let row = r.parentNode.parentNode.rowIndex;
    let cellItemName = document.getElementById("itemsTable").rows[row].cells[1].innerText;
    itemClickedValues(cellItemName);
}

//decreasing previous quantity value by 1 if user clciks '-' button and minus price from it
function minusFunction(r) {
    let row = r.parentNode.parentNode.rowIndex;
    let cellItemName = document.getElementById("itemsTable").rows[row].cells[1].innerText;
    itemRemovedValues(cellItemName);
}

$("#finish").on("click", function () {
    // Clear form by calling empty function
    $("body").empty();
    /*
    We only need to show the login form when the UI loads
    - If the login is successful, the fruits UI is rendered
    - If the login is unsuccessful, a message is shown on the screen to say that login was unsuccessful
    Note: To understand how the login page renders the fruits UI or display an error, check out loginUser.js
    */
    $("body").prepend(loginUser());
});




