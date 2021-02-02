
const form = `
<form id="form-Main">
<div id="container">

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
    let quantity = 0;

    //getting all categry names from mongodb collections then dispalying that on page in the form fixed side bar
    $.ajax({
        type: "GET",
        url: "/api/groceryItems/category/all",
    }).then((groceyItemCategories) => {
        groceyItemCategories.forEach((itemEl) => {
            $("#groceryList").append(`<a class="category" href="#" name="${itemEl._id}">${itemEl.name}</a>`);
        });
    });

    $(document).on("click", ".category", async (e) => {
        e.preventDefault();
        const categoryId = e.target.name;
        const categoryName = e.target.text;
        $("#resultItems").empty();
        $("#resultItems").show();
        $("#selectedItemsTable").hide();
        selectedCategory(categoryId, categoryName);
    });

    const selectedCategory = (categoryId, categoryName) => {
        $(".main ol").empty();
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
                $("#resultItems").append(`<tr>
                <td>${itemNumber}</td>
                <td>${element.itemname}</td>
                <td>$${element.price}</td>
                <td>${quantity}
                <input type="button" value=" + " class="plus" name="${element.itemname}$${element.price}" >
                   <input type="button" value=" - " class="minus"  name="${element.itemname}$${element.price}" >
                <button class="delete fa fa-trash-o" value= "${element.itemname}$${element.price}">
                    </button></td></tr>`);
            });
        });
    }

    //it checks user slected item for 1st time or not then increases quantity and price based on that
    const selectedItems = (nameOfItem, priceofItem) => {
        const exist = numberOfItems.find(({ itemname }) => itemname === nameOfItem);
        if (exist) {
            itemNumber++;
            console.log("its here in exist:", exist);
            console.log(numberOfItems);
            const objIndex = numberOfItems.findIndex((exist => exist.itemname == nameOfItem));
            numberOfItems[objIndex].repeated = exist.repeated + 1;
            numberOfItems[objIndex].price = exist.repeated * priceofItem;
            alert(`you got ${numberOfItems[objIndex].repeated - 1} ${nameOfItem} in the list, Do you want to 1 more`);
        } else {
            const idItemObject = { id: itemNumber, itemname: nameOfItem, price: priceofItem, originalprice: priceofItem, repeated: 1 };
            numberOfItems.push(idItemObject);
        }
        printResult();
    }

//add this table data to the cart    
    //prins all selected item details like serial number, name,price and quantity values with total price on page in table form
    function printResult() {
        let sum = 0;
        $("#selectedItemsTable").empty();
        $("#selectedItemsTable").show();
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