export function buildUserUpdate(req: any, currentUser: any) {
  return {
    ...currentUser,
    ...req.body,
  };
}

