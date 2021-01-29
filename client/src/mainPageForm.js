
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

const mainForm = () => {
    // to store items selected by the user
    let numberOfItems = [];

    // number of items selected by the user
    let itemNumber = 0;

    //getting data from mongodb collections then dispalying that on page
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
                // products[`${itemEl.name}`] = categoryItems;
                categoryItems.forEach((element) => {
                    $(`#${itemEl.name}`).append(`<li><input class="itemNames" type="button" name="${element.itemname}" value="${element.itemname} $${element.price}"> </li>`);
                });
            });
        });
    });

    //when user clicks/selects an item it gets name and price of that item
    $(document).on("click", ".itemNames", async (e) => {
        e.preventDefault();
        const nameOfItem = e.target.name;
        const priceofItems = e.target.value;
        const priceofItem = priceofItems.split('$')[1];
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
            numberOfItems[objIndex].price = exist.repeated * priceofItem;
            alert(`you got ${numberOfItems[objIndex].repeated - 1} ${nameOfItem} in the list, Do you want to 1 more`);
        } else {
            const idItemObject = { id: itemNumber, itemname: nameOfItem, price: priceofItem, originalprice: priceofItem, repeated: 1 };
            numberOfItems.push(idItemObject);
        }
        printResult();
    }


    //prins all selected item details like serial number, name,price and quantity values with total price on page in table form
    function printResult() {
        let sum = 0;
        $("#resultItems").empty();
        for (let i = 0; i < numberOfItems.length; i++) {
            $("#resultItems").append(`<tr>
        <td>${i + 1}</td>
        <td>${numberOfItems[i].itemname}</td>
        <td>$${numberOfItems[i].price}</td>
        <td>${numberOfItems[i].repeated}
        <input type="button" value="+" class="plus" name="${numberOfItems[i].itemname}$${numberOfItems[i].price}" >
           <input type="button" value="-" class="minus"  name="${numberOfItems[i].itemname}$${numberOfItems[i].price}" >
        <button class="delete fa fa-trash-o" value= "${numberOfItems[i].itemname}$${numberOfItems[i].price}">
            </button></td></tr>`);
            const priceOf = numberOfItems[i].price;
            sum = +priceOf + sum;
        }
        $("#resultItems").append(`<tr><th></th><th>Total price:</th><th>${sum}</th>`);
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