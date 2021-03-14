import newUser from "./signupUser";

const form = `
  <form id="login-user">
  <h1>Login</h1>
  <h6>Please login to continue</h6>
    <div class="form-group">
      <label for="Email">Email</label>
      <input type="text" class="form-control" placeholder="Please enter your email" name="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" placeholder="Please enter password" name="password">
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  
  <button id="register-new-user" class="btn btn-primary">Create account to Login </button>
  </form>
`;

const loginUser = () => {
  $(document).on("submit", "#login-user", async (event) => {
    event.preventDefault();
    
    // Extract username and password entered
    const formData = {
      email: $("input[name='email']").val(),
      password: $("input[name='password']").val(),
    };

    try {
      const response = await $.ajax({
        type: "POST",
        url: "/api/users/login",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });
      $("body").empty();
    } catch (err) {
      $("body").append("<div>Invalid email/pass provided!</div>");
    }
  });
  return form;
};


$(document).on("click", "#register-new-user", () => {
  $("body").empty();
  $("body").append(newUser());
});

export default loginUser;