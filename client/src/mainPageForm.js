
const form = `
<form id="form-Main">

<table id="selectedItemsTable">
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
<div id="container">
<table id="itemsTable">
<thead>
<tr>
    <th>ItemNo.</th>
    <th>Name</th>
    <th>Price</th>
    <th></th>
</tr>
</thead>
<tbody id="itemsOfTable">
</tbody>
</table>

<div class="images">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVociO7PJK-EOOVz1f-se7zT6euNErCJTcXA&usqp=CAU">
<img src="https://www.bakingbusiness.com/ext/resources/2020/4/OnlineGroceryShopping_Lead.jpg?1586435720">

</div>
<div id="groceryList">
</div>

<div class="main">
</div>
<footer>
<p>Please call 123445 for enquiries</p>
</footer>
</div>
</form>
`;

const mainForm = () => {
    // to store items selected by the user
    let numberOfItems = [];
    // number of items selected by the user
    let itemNumber = 0;
    //let quantity = 0;

    let cartNumber=0;

    $( document ).ready(function() {
        $("#itemsTable").hide();
        $("#selectedItemsTable").hide();
        });

    //getting all categry names from mongodb collections then dispalying that on page in the form fixed side bar
    $.ajax({
        type: "GET",
        url: "/api/groceryItems/category/all",
    }).then((groceyItemCategories) => {
        groceyItemCategories.forEach((itemEl) => {
            $("#groceryList").append(`<a class="category" href="#" name="${itemEl._id}">${itemEl.name}</a>`);
        });
    });

    $(document).on("click", ".cart", async (e) => {
        e.preventDefault();
        $("#container").hide();
        printResult();
     });

    $(document).on("click", ".category", async (e) => {
        e.preventDefault();
        const categoryId = e.target.name;
        const categoryName = e.target.text;
        $("#itemsTable").show();
        $("#itemsOfTable").empty();
        selectedCategory(categoryId);
    });

    const selectedCategory = (categoryId) => {
        $(".images").remove();

        // number of items selected by the user
        let itemNumber = 0;

        //$(".main").append(`<ol id=${categoryName}></ol>`);
        $.ajax({
            type: "GET",
            url: `/api/groceryItems/category/${categoryId}`,
        }).then((categoryItems) => {
            categoryItems.forEach((element) => {
                itemNumber = itemNumber + 1;
                //$(`#${categoryName}`).append(`<li><input class="itemNames" type="button" name="${element.itemname}" value="${element.itemname} $${element.price}"> </li>`);
                $("#itemsOfTable").append(`<tr class="${element.itemname}">
                <td>${itemNumber}</td>
                <td>${element.itemname}</td>
                <td>$${element.price}</td>
                <td><button class="AddToCart" value= "${element.itemname}$${element.price}">Add to Cart</button>
                </td></tr>`);
            });
        });
    }

   

    $(document).on("click", ".AddToCart", async (e) => {
        e.preventDefault();
        const dummy=cartNumber;
       cartNumber=cartNumber+1;
       $('.cart h4').remove();
       $(".cart").append(`<h4>${cartNumber}</h4>`);
        const newitem = e.target.value;
        const nameOfItem = newitem.split('$')[0];
        const priceofItem = newitem.split('$')[1];
        selectedItems(nameOfItem, priceofItem);
    });


    //it checks user slected item for 1st time or not then increases quantity and price based on that
    const selectedItems = (nameOfItem, priceofItem) => {
        const exist = numberOfItems.find(({ itemname }) => itemname === nameOfItem);
        if (exist) {
            itemNumber++;
            console.log("its here in exist:", exist);
            console.log(numberOfItems);
            const objIndex = numberOfItems.findIndex((exist => exist.itemname == nameOfItem));
            numberOfItems[objIndex].repeated = exist.repeated + 1;
            numberOfItems[objIndex].price = exist.repeated * exist.originalprice;
            alert(`you got ${numberOfItems[objIndex].repeated - 1} ${nameOfItem} in the list, Do you want to 1 more`);
        } else {
            const idItemObject = { id: itemNumber, itemname: nameOfItem, price: priceofItem, originalprice: priceofItem, repeated: 1 };
            numberOfItems.push(idItemObject);
        }
       
    }

//add this table data to the cart    
    //prins all selected item details like serial number, name,price and quantity values with total price on page in table form
    function printResult() {
        let sum = 0;
        $("#selectedItemsTable").show();
        $("#resultItems").empty();
       
        for (let i = 0; i < numberOfItems.length; i++) {
            $("#selectedItemsTable").append(`<tr>
        <td>${i + 1}</td>
        <td>${numberOfItems[i].itemname}</td>
        <td>$${numberOfItems[i].price}</td>
        <td>${numberOfItems[i].repeated}
        <input type="button" value=" + " class="plus" name="${numberOfItems[i].itemname}$${numberOfItems[i].price}" >
           <input type="button" value=" - " class="minus"  name="${numberOfItems[i].itemname}$${numberOfItems[i].price}" >
        <button class="delete fa fa-trash-o" value= "${numberOfItems[i].itemname}$${numberOfItems[i].price}">
            </button></td></tr>`);
            const priceOf = numberOfItems[i].price;
            sum = +priceOf + sum;
        }
        $("#selectedItemsTable").append(`<tr><th></th><th>Total price:</th><th>${sum}</th>`);
       
    }

    //its called when user clciks on '+' button
    $(document).on("click", ".plus", async (e) => {
        e.preventDefault();
        const newitem = e.target.name;
        const nameOfItem = newitem.split('$')[0];
        const priceofItem = newitem.split('$')[1];
        selectedItems(nameOfItem, priceofItem);
        printResult();
        // // this can be added to increse price and quantity in the list
        // const $row=$(`.${nameOfItem}`); 
        // const itemNumber=  parseInt($row.find("td:eq(0)").text());
        // const tdQuantity = parseInt($row.find("td:eq(3)").text());
        // const quantity=tdQuantity+1;
        // const doublePrice = priceofItem*2;
        // console.log("DoublePrice:",doublePrice, "DoubleQuantity:", quantity);
        // $row.find("td:eq(2)").text(`$${doublePrice}`);
        // $row.find("td:eq(3)").text(`${quantity}`);
    });


    //its called when user clciks on '-' button
    $(document).on("click", ".minus", async (e) => {
        e.preventDefault();
        const newitem = e.target.name;
        const nameOfItem = newitem.split('$')[0];
        const priceofItem = newitem.split('$')[1];
        console.log(priceofItem);
        console.log(numberOfItems);
        removeItems(nameOfItem);
    });

    //its called when user clciks on 'delete icon/trash' icon
    $(document).on("click", ".delete", async (e) => {
        e.preventDefault();
        const newitem = e.target.value;
        const nameOfItem = newitem.split('$')[0];
        deleteSelectedItem(nameOfItem);
    });

    // when user clciks on '-' it decreases price and quantity and display results back to the user
    const removeItems = (nameOfItem) => {
        const exist = numberOfItems.find(({ itemname }) => itemname === nameOfItem);
        if (exist && exist.repeated > 1) {
            const objIndex = numberOfItems.findIndex((exist => exist.itemname == nameOfItem));
            numberOfItems[objIndex].repeated = exist.repeated - 1;
            numberOfItems[objIndex].price = exist.price - exist.originalprice;
            alert(`you have only ${numberOfItems[objIndex].repeated} ${nameOfItem} in the list`);
            printResult();
        } else if (exist.repeated = 1) {
            deleteSelectedItem(nameOfItem);
        }
    }

    // when user clciks on delete icon it delets that item from the table
    const deleteSelectedItem = (nameOfItem) => {
        const exist = numberOfItems.find(({ itemname }) => itemname === nameOfItem);
        const objIndex = numberOfItems.findIndex((exist => exist.itemname == nameOfItem));
        numberOfItems.splice(objIndex, 1);
        alert(`${nameOfItem} is removed from the list`);
        printResult();
    }

    return form;
};

export default mainForm;