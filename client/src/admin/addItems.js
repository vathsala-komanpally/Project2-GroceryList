
const form = `
<form id="form-Add">
<h1>Add new items</h1>
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
  <button type="submit" class="btn btn-primary">Add Item</button>
  </form>
`;


const newItem = () => {
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

  //form submit button handler logic
  // async is a keyword for the function declaration
  $(document).on('submit', "form#form-Add", async (e) => {
    e.preventDefault();
    console.log($("#itemname").val());
    console.log($("#price").val());
    console.log($("#noofitems").val());
    console.log($(`input[name="readyToEat"]:checked`).val());
    console.log($('#categories').val());
    console.log("Data entered");

    // this is the object that gets sent as part of the post request
    const requestBody = {
      itemname: $("#itemname").val(),
      price: $("#price").val(),
      noOfItems: $("#noofitems").val(),
      readyToEat: $(`input[name="readyToEat"]:checked`).val(),
      categoryId: $("#categories").val(),
    };
    console.log("requestBody", requestBody);


    // Making the call to post request
    // await is used during the promise handling
    const response = await $.ajax({
      type: "POST", // OR GET
      url: "/api/groceryItems/new-item",
      contentType: "application/json",
      data: JSON.stringify(requestBody),
    });
    //.then((data)=>{ //here u can use response or data
    console.log("data:", response);
    // Logging response back to the console
    console.log(
      `This is the response I get back!: ${response}`
    );
  });
  return form;
};

export default newItem;