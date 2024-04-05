import Handlebars from "handlebars";
import "./profile-list.css";

export { default as ProfileList } from "./profile-list.hbs?raw";

Handlebars.registerHelper("rows", () => {
  return [
    {
      label: "Почта",
      text: "pochta@yandex.ru",
    },
    {
      label: "Логин",
      text: "ratanovoleg",
    },
    {
      label: "Имя",
      text: "Олег",
    },
    {
      label: "Фамилия",
      text: "Ратанов",
    },
    {
      label: "Имя в чате",
      text: "Олег",
    },
    {
      label: "Телефон",
      text: "+7 960 087 87 08",
    },
    {
      label: "Телефон",
      text: "+7 999 999 99 99",
    }
  ];
});
