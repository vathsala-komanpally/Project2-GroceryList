import "regenerator-runtime/runtime";

import loginUser from "./user/loginUser";

/*
We only need to show the login form when the UI loads
- If the login is successful, the fruits UI is rendered
- If the login is unsuccessful, a message is shown on the screen to say that login was unsuccessful
Note: To understand how the login page renders the fruits UI or display an error, check out loginUser.js
*/
$("body").prepend(loginUser());