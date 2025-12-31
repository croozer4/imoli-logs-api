import { randomUUID } from 'crypto';
import { createUser, findUserByUsername, Permission } from './users.repository';
import ApiError from '@/utils/ApiError';

export interface CreateUserRequest {
	username: string;
	permissions: Permission[];
}

export interface CreateUserResponse {
	username: string;
	token: string;
	permissions: Permission[];
}

const ALLOWED_PERMISSIONS: Permission[] = ['read', 'create'];

export class UsersService {
	async createNonAdminUser(
		input: CreateUserRequest,
	): Promise<CreateUserResponse> {
		const { username, permissions } = input;

		if (!username || typeof username !== 'string') {
			throw new Error('Username is required and must be a string');
		}

		const invalidPermissions = permissions.filter(
			(p) => !ALLOWED_PERMISSIONS.includes(p),
		);

		if (invalidPermissions.length > 0) {
			throw new Error(
				`Invalid permissions: ${invalidPermissions.join(', ')}`,
			);
		}

		const existingUsername = await findUserByUsername(username);
		if (existingUsername) {
			throw new ApiError(409, 'Username already exists');
		}

		const token = randomUUID();

		const createdUser = await createUser({
			username,
			token,
			permissions,
			isAdmin: false,
		});

		return {
			username: createdUser.username,
			token: createdUser.token,
			permissions: createdUser.permissions as Permission[],
		};
	}
}

export const usersService = new UsersService();
