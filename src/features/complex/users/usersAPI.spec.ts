import { fetchUsers, IUser, getUsersSortedByAName } from "./usersAPI";

describe("users reducer", () => {
  it("should return an array with more than 0 items", async () => {
    const res = await fetchUsers({ pAmount: 100, pPageNum: 1 });
    const users = res.users ?? [];
    expect(users.length > 0).toEqual(true);
  });
  it("should return an array with more than 0 items", async () => {
    const users: IUser[] = [
      {
        firstName: "Beron",
        id: 1,
        email: "beron@gmail.com",
        lastName: "gamboa",
        avatar: "beron.image.jpg",
      },
      {
        firstName: "Jennifer",
        id: 2,
        email: "jennifer@gmail.com",
        lastName: "leon",
        avatar: "jennifer.image.jpg",
      },
      {
        firstName: "Kael",
        id: 3,
        email: "kael@gmail.com",
        lastName: "sunrise",
        avatar: "kael.image.jpg",
      },
      {
        firstName: "Alejandra",
        id: 4,
        email: "alejandra@gmail.com",
        lastName: "gates",
        avatar: "alejandra.image.jpg",
      },
      {
        firstName: "Fernando",
        id: 5,
        email: "fernando@gmail.com",
        lastName: "paredes",
        avatar: "fernando.image.jpg",
      },
      {
        firstName: "Yasuri",
        id: 6,
        email: "yasuri@gmail.com",
        lastName: "naranjo",
        avatar: "yasuri.image.jpg",
      },
    ];
    const usersSorted = getUsersSortedByAName({ pUsers: users, pName: "fer" });
    expect(usersSorted[0].id).toEqual(5);
  });
});
