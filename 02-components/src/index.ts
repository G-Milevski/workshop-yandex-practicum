import { HomePage } from "./pages/Home";
import { Button } from "./components/Button";
import { Login } from "./pages/Login";
import { AllPages } from "./pages/AllPages";
import renderDOM from "./utils/renderDom";

window.addEventListener("DOMContentLoaded", () => {
  const homePage = new HomePage({ userName: "Joen" });
  const LoginPage = new Login({
    inputs: [
      {
        events: {
          change: () => {},
        },
        label: "test",
        type: "text",
        value: "t1",
      },
      {
        events: {
          change: () => {},
        },
        label: "test2",
        type: "password",
        value: "t2",
      },
    ],
  });

  const pages = [
    { link: "/home", label: "home" },
    { link: "/login", label: "login" },
  ];
  const allPages = new AllPages({ pages });

  renderDOM(allPages, "#nav");

  switch (window.location.pathname) {
    case "/home":
      renderDOM(homePage);
      break;
    case "/login":
      renderDOM(LoginPage);
      break;
    default:
      break;
  }
});
