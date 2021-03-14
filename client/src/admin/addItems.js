const form = `
<form id="form-Add">
<h1>Add new items</h1>
<div class = "form-group">
<label for="categoryType">Enter category name:</label>
<input type="text" class="form-control" id="categoryname" placeholder="Enter a name of category" name="categoryname">
<input type="button" id="idcategoryType" value="Add category">
</div>
<div class = "form-group">
<label for="categoryId">Choose a category:</label>
     <select name="categoryId" id="categories">
     <option value=""</option>
      </select>
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
 
  <button type="submit" class="btn btn-primary">Add Item</button>
  </form>
`;


const newItem = () => {

  $(document).on('click', "#idcategoryType", async (e) => {
    e.preventDefault();
    const requestB ={
      name: $("#categoryname").val(),
    };
    const categoryRespon = $.ajax({
      type: "POST",
      url: "/api/groceryItems/category",
      contentType: "application/json",
      data: JSON.stringify(requestB),
    });
    $("#categories").empty();
    categoryDispaly();
  });
  
const categoryDispaly=()=>{
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
}
categoryDispaly();
  
  //form submit button handler logic
  $(document).on('submit', "form#form-Add", async (e) => {
    e.preventDefault();
    // this is the object that gets sent as part of the post request
    const requestBody = {
      itemname: $("#itemname").val(),
      price: $("#price").val(),
      noOfItems: $("#noofitems").val(),
      readyToEat: $(`input[name="readyToEat"]:checked`).val(),
      categoryId: $("#categories").val(),
    };

    const response = await $.ajax({
      type: "POST", // OR GET
      url: "/api/groceryItems/new-item",
      contentType: "application/json",
      data: JSON.stringify(requestBody),
    });
    window.alert("Item Added!");
    $("#itemname").val("");
    $("#price").val("");
    $("#noofitems").val("");
  });
  return form;
};

export default newItem;