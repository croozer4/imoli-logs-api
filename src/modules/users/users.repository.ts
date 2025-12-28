import { User } from './user.schema';

export type Permission = 'read' | 'create';

export interface CreateUserInput {
    username: string;
    token: string;
    permissions: Permission[];
    isAdmin: boolean;
}

export const findUserByToken = async (token: string) => {
    return User.findOne({ token }).lean();
}

export const findUserByUsername = async (username: string) => {
    return User.findOne({ username }).lean();
}

export const createUser = async (data: CreateUserInput) => {
    const user = new User(data);
    await user.save();
    return user.toObject();
}