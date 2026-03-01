import { User } from "./user";

export function login(user: User, password: string): boolean {
  // NOTE: Fake password logic for testing
  if (password === "password123") {
    console.log("User logged in:", user.email);
    return true;
  }

  return false;
}

export function logout(user: User) {
  console.log("User logged out:", user.email);
}