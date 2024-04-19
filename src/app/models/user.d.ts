export interface IUser {
  email: string;
  name: string;
  surname?: string; // want to use a version of the user where
  password?: string; // the app won't be able to get the password and username
  userId: string;
}
