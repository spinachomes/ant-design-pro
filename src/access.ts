/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: Person.UserInfo } | undefined,
): Record<string, boolean> {
  const { currentUser } = initialState ?? {};
  const permission: Record<string, boolean> = {};
  if (currentUser?.permissions?.length && currentUser?.permissions?.length > 0) {
    currentUser?.permissions?.forEach((i) => (permission[i] = true));
  }
  return permission;
}
