import { ChatDTO, UserDTO } from "../api/type";
import constants from "../constants";
import { Chat, User } from "../type";

const buildPathToResource = (resource: string | null) => {
  if(!resource) {
    return null;
  }

  return `${constants.HOST}/resources/${resource}`
}

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};


export const transformChats = (data: ChatDTO[]): Chat[] => {
  return data.map(chat => ({
    avatar: buildPathToResource(chat.avatar),
    id: chat.id,
    title: chat.title,
    unreadCount: chat.unread_count,
    lastMessage: chat.last_message ? {
      content: chat.last_message.content,
      time: chat.last_message.time,
      user: {
        id: chat.last_message.user.id,
        login: chat.last_message.user.login,
        firstName: chat.last_message.user.first_name,
        secondName: chat.last_message.user.second_name,
        displayName: chat.last_message.user.display_name,
        avatar: chat.last_message.user.avatar,
        phone: chat.last_message.user.phone,
        email: chat.last_message.user.email,
      }
    } : null
  }));
}