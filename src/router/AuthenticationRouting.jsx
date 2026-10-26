import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";

const AuthenticationRouting = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export default AuthenticationRouting;
