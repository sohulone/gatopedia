export interface User {
  id: string;
  email: string;
  name: string;
  favoriteBreed: string;
  avatar: string;
}

export interface RegisterData {
  email: string;
  name: string;
  favoriteBreed: string;
  avatar: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const CAT_AVATARS = [
  '😺', '😸', '😹', '😻', '😼', '😽', 
  '🙀', '😿', '😾', '🐱', '🐈', '🐈‍⬛'
];
