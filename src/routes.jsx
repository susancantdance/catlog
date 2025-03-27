import { App } from "./App";
import { Signup } from "./signup.jsx";
import { Login } from "./login.jsx";
import { Post } from "./post.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/post/:postid", element: <Post /> },
];

export { routes };
