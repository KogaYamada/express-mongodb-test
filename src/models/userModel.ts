import mongoose, { Schema, Document, Model, DocumentQuery } from 'mongoose';
import { User } from '../types/user';

export interface UserDoc extends Document, User {
  fullName?: string;
}

// スキーマを定義
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fristName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    age: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// バーチャルフィールド
userSchema.virtual('fullName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});

// クエリヘルパー
const queryHelpers = {
  findByUserName(this: DocumentQuery<any, User>, username: string) {
    return this.findOne({ username });
  },
};
userSchema.query = queryHelpers;

interface UserModel extends Model<User, typeof queryHelpers> {}

export default mongoose.model<User, UserModel>('User', userSchema);
