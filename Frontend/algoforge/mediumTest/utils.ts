export function formatEmail(email: string) {
  return email.trim().toLowerCase();
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}