import { createContext } from 'react';
import avatarImg from '../images/avatar.jpg';

export const defaultCurrentUser = {
  name: 'Меместо',
  about: 'Место ваших мемов',
  avatar: avatarImg,
  _id: '',
  cohort: '',
};
export const CurrentUserContext = createContext(defaultCurrentUser);
