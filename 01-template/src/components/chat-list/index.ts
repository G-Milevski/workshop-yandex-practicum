import Handlebars from "handlebars";
import "./chat-list.css";
import cat1 from "../../assets/01.jpg";
import cat2 from "../../assets/02.jpg";
import cat3 from "../../assets/03.jpg";

export { default as ChatList } from "./chat-list.hbs?raw";

Handlebars.registerHelper("cats", () => {
  return [
    {
      title: "Андрей",
      avatar: cat1,
      date: "10:49",
      desc: "Description cat-1 meow",
      new_message: 3
    },
    {
      title: "Вадим",
      avatar: cat2,
      date: "12:00",
      desc: "Вы: Круто!",
      active: true,
    },
    {
      title: "cat-3",
      avatar: cat3,
      date: "15:12",
      desc: "Description cat-3 cat-3 cat-3",
      new_message: 1
    },
    {
      title: "cat-1",
      avatar: cat1,
      date: "Пт",
      desc: "Description cat-1 meow",
    },
    {
      title: "cat-2",
      avatar: cat2,
      date: "Ср",
      desc: "Description cat-2 cat-2 meow meow",
    },
    {
      title: "cat-3",
      avatar: cat3,
      date: "Пн",
      desc: "Description cat-3 cat-3 cat-3",
    },
    { title: "cat-2", avatar: cat2, date: "Пт", desc: "meow" },
    { title: "cat-2", avatar: cat2, date: "1 Мая 2020", desc: "meow" },
    { title: "cat-2", avatar: cat2, date: "12 Апр 2020", desc: "meow" },
  ];
});
