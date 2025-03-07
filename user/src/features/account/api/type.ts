import { Role } from "constants/enums";

export type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type UserEditBody = {
  name: string;
  email: string;
};
