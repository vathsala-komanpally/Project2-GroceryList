import loginUser from "./loginUser";

const form = `
  <form id="new-user">
  <h1>Create an account</h1>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" placeholder="Please enter username of min 5 and max 15 charcters" name="username" pattern="^[a-z0-9]{5,15}$" required>
    </div>
    <div class="form-group">
      <label for="mobilenumber">MobileNumber</label>
      <input type="tel" class="form-control" placeholder="Must start with 04 of length 10" name="mobilenumber" pattern="[04][0-9]{9}"required>
    </div>
    <div class="form-group">
      <label for="Email">Email</label>
      <input type="email" class="form-control" placeholder="Please enter a valid email" name="email" required>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" placeholder="It must contain a lower case and upper case of min 8 charcters length" 
      name="password" pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
    </div>
    <button type="submit" class="btn btn-primary">Sign Up</button>
  </form>
`;

const newUser = () => {
  $(document).on("submit", "#new-user", async (event) => {
    event.preventDefault();

    // Extract user deatils from the form
    const formData = {
      username: $("input[name='username']").val(),
      mobilenumber: $("input[name='mobilenumber']").val(),
      email: $("input[name='email']").val(),
      password: $("input[name='password']").val(),
    };

    try {
      // Make a POST request to the server to create a new user with all details
      const response = await $.ajax({
        type: "POST",
        url: "/api/users/register",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });
     
      // Clear form by calling empty function
      $("body").empty();

      // Append the login form so user can now login
      $("body").append(loginUser());
    } catch (err) {
      // Inform user that their login could not be created if there's an error
      $("body").append("<div>Could not create user</div>");
    }
  });
  return form;
};

export default newUser;