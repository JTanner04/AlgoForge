import { createUser } from "./user";
import { login } from "./auth";
import { formatEmail } from "./utils";

const user = createUser("Jeremiah", formatEmail("TEST@EMAIL.COM"));

const success = login(user, "password123");

if (success) {
  console.log("Access granted");
} else {
  console.log("Access denied");
}