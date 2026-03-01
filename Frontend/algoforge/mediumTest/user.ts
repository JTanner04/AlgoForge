export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export function createUser(name: string, email: string): User {
  return {
    id: Date.now(),
    name,
    email,
    isAdmin: false
  };
}