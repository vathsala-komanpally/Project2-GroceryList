// Make a DELETE request to the server to delete a fruit
const form = `
<form id="form-Delete">
<h1>Delete items</h1>
<div class="form-group">
    <label for="itemId">Item Id </label>
    <input type="text" class="form-control" id="itemId" placeholder="Enter item Id" name="itemId">
  </div>
  <button type="submit" class="btn btn-primary">Delete Item</button>
  </form>
`;


const deleteItem = () => {
    $(document).on('submit', "form#form-Delete", async (e) => {
        e.preventDefault();
       
        const response = await $.ajax({
            type: "DELETE",
            url: `/api/groceryItems/delete-item/${$("#itemId").val()}`,
            contentType: "application/json",
        });
        // Create a pop up alert in the UI to inform the user that fruit was deleted
        window.alert("Fruit Deleted!");
    });
    return form;
}

export default deleteItem;

