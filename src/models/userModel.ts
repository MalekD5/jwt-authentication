import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  email: string;
  refreshToken: string;
}

const schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

export default model<IUser>('User', schema);
