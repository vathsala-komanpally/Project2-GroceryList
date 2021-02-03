console.log("Javascript file is running");
import "regenerator-runtime/runtime";
import loginUser from "./user/loginUser";
import adminUser from "./admin/adminLogin";
import mainForm from "./mainPageForm";

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
<a href="#home">Home</a>
<a href="#about">About</a>
<a href="#catalogue">Catalogue</a>
<a href="#recipes">Recipes</a>
<a href="#contactus">Contact Us</a>
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
//     console.log("inside here");
//     //how to take data in printresults function to here

// });

$("#myHref").on('click', function () {
    $("body").empty();
    $("body").append(adminUser());
});