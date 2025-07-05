export function renderProfile(user) {
  history.pushState({ page: "profile" }, "", "/user/profile");
  const token = localStorage.getItem("token");
  document.querySelector(
    "body"
  ).innerHTML = `<h1>Welcome, ${user.username}!</h1>
    <p>This is your Profile..</p>
    <p>Username : <span>${user.username}</span></p>
    <p>Email : <span>${user.email}</span></p>
    <p>Token : <span>${token}</span></p>`;
  //history.pushState("profile","profile")
}
export function renderLogin() {
  history.pushState({ page: "login" }, "", "/user/login");
  document.querySelector("body").innerHTML = `<form method="POST">
      <p>
        <label for="username">Enter Username:</label>
        <input type="text" id="username" name="username" required />
      </p>
      <p>
        <label for="password">Enter Pasword:</label>
        <input type="text" id="password" name="password" required />
      </p>
      <button type="submit">Login</button>
    </form>
    <p>
      Click here to register
      <a href="http://localhost:3000/user/register">Register</a>
    </p>`;
}

export function renderRegister() {
  history.pushState({ page: "register" }, "", "/user/register");
  document.querySelector("body").innerHTML = `<form method="POST">
      <p>
        <label for="username">Enter Name:</label>
        <input type="text" id="username" name="username" required />
      </p>
      <p>
        <label for="email">Enter Email:</label>
        <input type="text" id="email" name="email" required />
      </p>
      <p>
        <label for="password">Enter Password:</label>
        <input type="text" id="password" name="password" required />
      </p>
      <button type="submit">Submit</button>
    </form>
    <p>
      Already have an Account
      <a href="http://localhost:3000/user/login">Login</a>
    </p>`;
}

export async function makeGetReq(token,render) {
        const res = await fetch("http://localhost:3000/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          renderProfile(data.user);
        } else {
          localStorage.removeItem("token");
          render();
        }
      }