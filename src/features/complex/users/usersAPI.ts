export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
export interface IUserWithSimilarities extends IUser {
  similarities: number;
}

export interface fetchUsersArgs {
  pAmount: number;
  pPageNum: number;
}
export interface fetchUsersRes {
  users?: IUser[];
  totalPages?: number;
  totalUsers?: number;
  error: { message?: string };
}

export const fetchUsers = async ({
  pAmount,
  pPageNum,
}: fetchUsersArgs): Promise<fetchUsersRes> => {
  const headers = {
    accept: "application/json",
  };
  const postData = { method: "GET", headers };
  try {
    const rawRes = await fetch(
      `https://reqres.in/api/users?page=${pPageNum}&per_page=${pAmount}`,
      { ...postData },
    );
    const {
      data: rawUsers,
      total_pages: totalPages,
      total: totalUsers,
    } = await rawRes.json();
    const errorMsg =
      rawUsers.length < 1 ? "there is no users to show" : undefined;
    const users = rawUsers.map((user: any) => {
      const {
        first_name: firstName,
        last_name: lastName,
        email,
        avatar,
      } = user;
      return { firstName, lastName, email, avatar };
    });
    const res: fetchUsersRes = {
      users,
      totalPages,
      totalUsers,
      error: { message: errorMsg },
    };
    return res;
  } catch (e: any) {
    const res: fetchUsersRes = {
      users: [],
      totalPages: 0,
      totalUsers: 0,
      error: { message: JSON.stringify(e) },
    };
    return res;
  }
};

export const getUsersSortedByAName = ({
  pUsers,
  pName,
}: {
  pUsers: IUser[];
  pName: string;
}): IUserWithSimilarities[] => {
  const searchName = pName.toLowerCase();
  const res = pUsers
    .map((user) => {
      const firstName = user.firstName.toLowerCase();
      let similarities = 0;
      let increment = 1;
      let lastMatchIdx = -2;
      for (let i = 0; i < searchName.length; i++) {
        const foundIdx = firstName.indexOf(searchName[i]);
        if (foundIdx >= 0) {
          similarities += 1;
          if (foundIdx === lastMatchIdx + 1) {
            similarities += increment;
            increment++;
          } else {
            increment = 1;
          }
          lastMatchIdx = foundIdx;
        }
      }
      return { ...user, similarities };
    })
    .sort((a, b) => b.similarities - a.similarities);
  return res;
};
