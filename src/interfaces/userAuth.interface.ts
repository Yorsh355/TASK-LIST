export interface IUserAuth {
  id: string; // User ID
  password: string; // User password
  email: string; // User email
  userName: string; // User name
  role: string[]; // User roles
  token: string; // JWT token
}
