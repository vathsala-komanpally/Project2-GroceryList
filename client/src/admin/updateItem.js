
const form = `
<form id="form-Update">
<h1>Update items</h1>
<div class="form-group">
    <label for="itemId">Item Id </label>
    <input type="text" class="form-control" id="itemId" placeholder="Enter item Id" name="itemId">
  </div>
  <div class = "form-group">
     <label for="itemname">Name of item</label>
     <input type="text" class="form-control" id="itemname" placeholder="Enter a name of the item to add" name="itemname">
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
  <div class = "form-group">
  <label for="categoryId">Choose a category:</label>
       <select name="categoryId" id="categories">
        </select>
  </div>
  <button type="submit" class="btn btn-primary">Update Item</button>
  </form>
`;


const updateItem = () => {
  // appending category values from database to form
  const categoryResponse = $.ajax({
    type: "GET",
    url: "/api/groceryItems/category/all",
  }).then((groceyItemCategories) => {
    console.log("groceyItemCategories", groceyItemCategories);
    let optionsHtml = "";
    groceyItemCategories.forEach((itemEl) => {
      console.log("itemEl", itemEl);
      optionsHtml = optionsHtml + `<option value=${itemEl._id}>${itemEl.name}</option>`;
      console.log("optionsHtml", optionsHtml);
    });
    console.log("optionsHtml", optionsHtml);
    $("#categories").append(optionsHtml);
  });

  $(document).on('submit', "form#form-Update", async (e) => {
    e.preventDefault();

    const requestBody = {
      itemname: $("#itemname").val(),
      price: $("#price").val(),
      noOfItems: $("#noofitems").val(),
      readyToEat: $(`input[name="readyToEat"]:checked`).val(),
      categoryId: $("#categories").val(),
    };
    console.log("requestBody", requestBody);
    
    
    const response = await $.ajax({
      type: "PATCH", // OR GET
      url: `/api/groceryItems/update-item/${$("#itemId").val()}`,
      contentType: "application/json",
      data: JSON.stringify(requestBody),
    });
  
    window.alert(response);
  
    $("#itemId").val("");
    $("#itemname").val("");
    $("#price").val("");
    $("#noofitems").val("");
  
  });
  return form;
};

export default updateItem;