import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin One",
    email: "adminone@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Admin Twp",
    email: "admintwo@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
