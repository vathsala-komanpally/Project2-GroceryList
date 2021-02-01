console.log("Javascript file is running");
import "regenerator-runtime/runtime";
import loginUser from "./user/loginUser";
import adminUser from "./admin/adminLogin";
import mainForm from "./mainPageForm";

const appForm = `
<form id="form-App">
<div id ="container">
<header>
<h1>Welcome! to Lucky's Grocery Market</h1>
<button id="finish" type="submit">Click here to Buy</button>
<label>Please choose the items to shop from below list then:</label>
<marquee behavior="scroll" direction="left">Please check our page for more updates on groceries</marquee>
</header>
<div id="admin">
<label>For admins only</label>
<a href="#" id="myHref">Click here</a>
<label>to update Grocery Items</label>
</div>
<div class=topmenu>
<a href="#home">Home</a>
<a href="#about">About</a>
<a href="#catalogue">Catalogue</a>
<a href="#recipes">Recipes</a>
<a href="#contactus">Contact Us</a>
<input type="text" placeholder="Search..">
</div>
</div>
</form>
`;

$("body").append(appForm);
$("body").append(mainForm);

$("#finish").on("click", function () {
    $("body").empty();
    $("body").append(loginUser());
});


$("#myHref").on('click', function () {
    $("body").empty();
    $("body").append(adminUser());
});