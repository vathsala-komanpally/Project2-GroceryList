// Make a DELETE request to the server to delete a fruit
const form = `
<form id="form-Delete">
<h1>Delete items</h1>
<div class = "form-group">
<label for="itemsForCategory">Choose an item:</label>
     <select class="categoryitemname" name="categoryItemName" id="categoryItems">
      </select>
</div>
  <button type="submit" class="btn btn-primary">Delete Item</button>
  </form>
`;

const deleteItem = () => {
    $.ajax({
        type: "GET",
        url: `/api/groceryItems/allGroceryItems`,
    }).then((Items) => {
        let optionsHtml = "";
        Items.forEach((itemEl) => {
            optionsHtml = optionsHtml + `<option value=${itemEl._id}>${itemEl.itemname}</option>`;
        });
        $("#categoryItems").append(optionsHtml);
    });

    $(document).on('submit', "form#form-Delete", async (e) => {
        e.preventDefault();
        const itemId = $("#categoryItems").val();
        const response = await $.ajax({
            type: "DELETE",
            url: `/api/groceryItems/delete-item/${itemId}`,
            contentType: "application/json",
        });
        // Create a pop up alert in the UI to inform the user that fruit was deleted
        window.alert("Fruit Deleted!");
    });
    return form;
}

export default deleteItem;

