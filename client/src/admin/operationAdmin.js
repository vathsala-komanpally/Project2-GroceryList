import newItem from "./addItems";
import updateItem from "./updateItem";
import deleteItem from "./deleteItem";

const form = `
<form id="adminOperations">
<h1>List of things Admin can do here:</h1>
<label>please chooose add to add new items <br>
or update to make any changes to existing items<br>
or delete to delete any items
</label><br>
<button type="button" id="add" class="btn btn-primary">Add</button>
<button type="button" id="update" class="btn btn-primary">Update</button>
<button type="button" id="delete" class="btn btn-primary">Delete</button>
</form>
`;

const operationsByAdmin = () => {
    $(document).on("click", "#add", async (e) => {
        e.preventDefault();
        $("body").empty();
        $("body").append(newItem());
    });


    $(document).on("click", "#update", async (e) => {
        e.preventDefault();
        $("body").empty();
        $("body").append(updateItem());
    });

    $(document).on("click", "#delete", async (e) => {
        e.preventDefault();
        $("body").empty();
        $("body").append(deleteItem());
    });
    return form;
}

export default operationsByAdmin;