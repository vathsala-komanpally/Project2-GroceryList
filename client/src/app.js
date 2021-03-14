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
<label>Please choose the items to shop from below list then click:</label>
<button id="login" type="submit">Login</button>
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
<div class="pageInfo">
<div class="home">
</div>
<div class="about">
</div>
<div class="catalogue">
</div>
<div class="recipes">
</div>
<div class="contactus">
</div>
</div>

</form>
`;

$("body").append(appForm);
$("body").append(mainForm);

$("#login").on("click", function () {
    $("body").empty();
    $("body").append(loginUser());
});

$("#myHref").on('click', function () {
    $("body").empty();
    $("body").append(adminUser());
});

$("#contactus").on('click', function () {
    $("#container").hide();
    $(".home").hide(); $(".about").hide(); $(".recipes").hide(); $(".catalogue").hide();
    $(".contactus").show(); 
    $(".contactus").append(contactUsForm());
});

$("#home").on('click', function () {
    $("#container").hide();
   $(".about").hide(); $(".recipes").hide(); $(".catalogue").hide();$(".contactus").hide();
   $(".home").show();  
   $(".home").append(homeForm());
});

$("#recipes").on('click', function () {
    $("#container").hide();
    $(".home").hide(); $(".about").hide(); $(".catalogue").hide();$(".contactus").hide();
    $(".recipes").show(); 
    $(".recipes").append(recipesForm());
});

$("#catalogue").on('click', function () {
    $("#container").hide();
    $(".home").hide(); $(".about").hide(); $(".recipes").hide();$(".contactus").hide();
    $(".catalogue").show(); 
    $(".catalogue").append(catalogueForm());
});

$("#about").on('click', function () {
    $("#container").hide();
    $(".home").hide(); $(".recipes").hide(); $(".catalogue").hide();$(".contactus").hide();
    $(".about").show(); 
    $(".about").append(aboutForm());
});