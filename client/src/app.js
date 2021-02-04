console.log("Javascript file is running");
import "regenerator-runtime/runtime";
import loginUser from "./user/loginUser";
import adminUser from "./admin/adminLogin";
import mainForm from "./mainPageForm";
import contactUsForm from "./page/contactus";
import homeForm from "./page/home";
import recipesForm from "./page/recipes";
import catalogueForm from "./page/catalogue";
import aboutForm from "./page/about";
const appForm = `
<form id="form-App">
<header>
<h1>Welcome! to Lucky's Grocery Market</h1>
<label>Please choose the items to shop from below list then:</label>
<button id="finish" type="submit">Click here to Buy</button>
<button class="cart" style="font-size:24px">Cart <i class="fa fa-shopping-cart"></i></button>
<marquee behavior="scroll" direction="left">Please check our page for more updates on groceries</marquee>

</header>

<div id="admin">
<label>For admins only</label>
<a href="#" id="myHref">Click here</a>
<label>to update Grocery Items</label>
</div>
<div class=topmenu>
<a id="home" href="#home">Home</a>
<a id="about" href="#about">About</a>
<a id="catalogue" href="#catalogue">Catalogue</a>
<a id="recipes" href="#recipes">Recipes</a>
<a id="contactus" href="#contactus">Contact Us</a>
<input type="text" placeholder="Search..">
<a href="Cart1.aspx" class="icon-shopping-cart" style="font-size: 25px"><asp:Label ID="lblCartCount" runat="server" CssClass="badge badge-warning"  ForeColor="White"/></a>
</div>

</form>
`;

$("body").append(appForm);
$("body").append(mainForm);

$("#finish").on("click", function () {
    $("body").empty();
    $("body").append(loginUser());
});

// $(".cart").on("click", function(){
//    //how to remove mainform html content here
//   // $("#form-Main").empty();
//    $("#container").hide();
//     console.log("inside here");
//     //how to take data in printresults function to here
// });

$("#myHref").on('click', function () {
    $("body").empty();
    $("body").append(adminUser());
});

$("#contactus").on('click', function () {
    $("#container").hide();
    $("body").append(contactUsForm());
});

$("#home").on('click', function () {
    $("#container").hide();
    $("body").append(homeForm());
});

$("#recipes").on('click', function () {
    $("#container").hide();
    $("body").append(recipesForm());
});

$("#catalogue").on('click', function () {
    $("#container").hide();
    $("body").append(catalogueForm());
});

$("#about").on('click', function () {
    $("#container").hide();
    $("body").append(aboutForm());
});