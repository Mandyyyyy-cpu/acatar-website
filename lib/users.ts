import usersData from "../data/master_users.json";


export type User = {
  id: number;
  account: string;
  password: string;
  collection: string;
  name: string;
  imageUrl: string;
};


export const users: User[] =
  usersData as User[];



export function findUserByAccount(
  account: string,
): User | undefined {

  const normalizedAccount =
    account.trim().toUpperCase();


  return users.find(
    (user) =>
      user.account.trim().toUpperCase() ===
      normalizedAccount,
  );
}