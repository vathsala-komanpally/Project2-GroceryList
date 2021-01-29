import operationsOfAdmin from "./operationAdmin";
const form = `
  <form id="admin-Login">
  <h1>Login</h1>
  <h6>Dear admin please login here to update grocery items</h6>
    <div class="form-group">
      <label for="username">User Name</label>
      <input type="text" class="form-control" placeholder="Please enter user name" name="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" placeholder="Please enter password" name="password">
    </div>
    <button type="submit" class="btn btn-primary" id="login">Login</button>
  </form>
`;

const adminUser = () => {
  $(document).on("submit", "#admin-Login", async (event) => {
    event.preventDefault();

    // Extract username and password entered
    const formData = {
      username: $("input[name='username']").val(),
      password: $("input[name='password']").val(),
    };
    try {
      const response = await $.ajax({
        type: "POST",
        url: "/api/admins/login",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });
      console.log(response);
      $("body").empty();
     
      $("body").append(operationsOfAdmin());
    } catch (err) {
      $("body").append("<div>Invalid email/pass provided!</div>");
    }
  });

  return form;
};

export default adminUser;