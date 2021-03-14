
const form = `
<form id="form-Update">
<h1>Update items</h1>
<div class = "form-group">
<label for="categoryId">Choose a category:</label>
     <select class="categoryname" name="categoryId" id="categories">
      </select>
</div>
<div class = "form-group">
<label for="itemsForCategory">Choose an item:</label>
     <select class="categoryitemname" name="categoryItemName" id="categoryItems">
      </select>
</div>
   <div class = "form-group">
     <label for="price">Price</label>
     <input type="text" class="form-control" id="price" placeholder="Enter a price of item" name="price">
  </div>
  <div class = "form-group">
  <label for="noofitems">Number Of Items</label>
  <input type="text" class="form-control" id="noofitems" placeholder="Enter no. of items" name="noofitems">
</div>
  <fieldset class="form-group">
    <legend class="col-form-label">Ready to Eat?</legend>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" id="readyToEatYes" name ="readyToEat" value="true">
      <label class="form-check-label" for="readyToEatYes">Yes</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" id="readyToEatNo" name ="readyToEat" value="false">
      <label class="form-check-label" for="readyToEatNo">No</label>
    </div>
  </fieldset>
  <button type="submit" class="btn btn-primary">Update Item</button>
  </form>
`;


const updateItem = () => {
  // appending category values from database to form
  const categoryResponse = $.ajax({
    type: "GET",
    url: "/api/groceryItems/category/all",
  }).then((groceyItemCategories) => {
    let optionsHtml = "";
    groceyItemCategories.forEach((itemEl) => {
      optionsHtml = optionsHtml + `<option value=${itemEl._id}>${itemEl.name}</option>`;
    });
    $("#categories").append(optionsHtml);
  });

  // user choosen category items in that list
  $(document).on("change", ".categoryname", async (e) => {
    e.preventDefault();
    const categoryId = e.target.value;
    itemsOfCategory(categoryId);
  });

  const itemsOfCategory = (categoryId) => {
    $("#categoryItems").empty();
    $.ajax({
      type: "GET",
      url: `/api/groceryItems/category/${categoryId}`,
    }).then((Items) => {
      let optionsHtml = "";
      Items.forEach((itemEl) => {
        optionsHtml = optionsHtml + `<option value=${itemEl.itemname}_${itemEl._id}>${itemEl.itemname}</option>`;
      });
      $("#categoryItems").append(optionsHtml);
    });
  }

  $(document).on('submit', "form#form-Update", async (e) => {
    e.preventDefault();
    let item = $("#categoryItems").val();
    const nameofItem = item.split('_')[0];
    const idofItem = item.split('_')[1];
    const requestBody = {
      itemname: nameofItem,
      price: $("#price").val(),
      noOfItems: $("#noofitems").val(),
      readyToEat: $(`input[name="readyToEat"]:checked`).val(),
      categoryId: $("#categories").val(),
    };
    
    const response = await $.ajax({
      type: "PATCH", // OR GET
      url: `/api/groceryItems/update-item/${idofItem}`,
      contentType: "application/json",
      data: JSON.stringify(requestBody),
    });

    window.alert(response);

    $("#itemname").val("");
    $("#price").val("");
    $("#noofitems").val("");
  });
  return form;
};

export default updateItem;