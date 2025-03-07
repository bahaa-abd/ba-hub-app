import { APIListParams } from "types/api";

export type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  wallet: Wallet;
  passwordChangedAt: string;
};

export type Wallet = {
  id: string;
  user: string;
  total: number;
  pending: number;
  createdAt: Date;
  updatedAt: Date;
  available: number;
};

export type UserAllParams = APIListParams;
