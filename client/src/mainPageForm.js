
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

<div class="images">
<img src="https://www.bakingbusiness.com/ext/resources/2020/4/OnlineGroceryShopping_Lead.jpg?1586435720">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVociO7PJK-EOOVz1f-se7zT6euNErCJTcXA&usqp=CAU">

<img src="https://blogs.vmware.com/velocloud/files/2018/03/Image_o-GROCERY-STORE-facebook.jpg">
<img src="https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2016/08/grocery-groceries-commerce-online-ss-1920.jpg">
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
        selectedCategory(categoryId, categoryName);
    });

    const selectedCategory = (categoryId, categoryName) => {
        $(".main ol").empty();
        $(".images").remove();
        $(".main").append(`<ol id=${categoryName}></ol>`);
        $.ajax({
            type: "GET",
            url: `/api/groceryItems/category/${categoryId}`,
        }).then((categoryItems) => {
            categoryItems.forEach((element) => {
                $(`#${categoryName}`).append(`<li><input class="itemNames" type="button" name="${element.itemname}" value="${element.itemname} $${element.price}"> </li>`);
            });
        });
    }

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
        <input type="button" value=" + " class="plus" name="${numberOfItems[i].itemname}$${numberOfItems[i].price}" >
           <input type="button" value=" - " class="minus"  name="${numberOfItems[i].itemname}$${numberOfItems[i].price}" >
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