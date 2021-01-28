
const form = `
<form id="form-Main">
<table id="itemsTable">
<thead>
<tr>
    <th>ItemNo.</th>
    <th>Name</th>
    <th>Price</th>
    <th>Quantity</th>
</tr>
</thead>
<tbody id="resultItems">
</tbody>
</table>

<div id="groceryList">
</div>

<footer>
<p>Please call 123445 for enquiries</p>
</footer>

</form>
`;

const mainForm=()=>{
    
const products = {}; 
let numberOfItems = [];
let itemNumber = 0;

//passing data from mongodb collections to html page
$.ajax({
    type: "GET",
    url: "/api/groceryItems/category/all",
  }).then((groceyItemCategories) => {
    groceyItemCategories.forEach((itemEl) => {
        $("#groceryList").append(`<h2>${itemEl.name}</h2>`);
        $("#groceryList").append(`<ol id=${itemEl.name}></ol>`);
        $.ajax({
            type: "GET",
            url: `/api/groceryItems/category/${itemEl._id}`,
          }).then((categoryItems) => {
            products[`${itemEl.name}`] = categoryItems;
           categoryItems.forEach((element) => {
                $(`#${itemEl.name}`).append(`<li><input id="itemNames" type="button" name="${element.itemname}" value="${element.itemname} $${element.price}"> </li>`);
            });///it has data in products object here
    });  
  });
});
// but its empty in here
console.log("Products array:",products);

//when user clicks on each item it prints those items on the page in form of table
$(document).on("click", "#itemNames", async (e) => {
    e.preventDefault();
    //why this line showing only one ietm name 
    const nameOfItem = document.getElementById("itemNames"); 
    //const nameOfItem = document.getElementById("itemNames").value; 
    console.log("I am here",nameOfItem);
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
return form;
};

export default mainForm;