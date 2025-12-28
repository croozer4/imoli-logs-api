import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { Permission } from './users.repository';

export const createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, permissions } = req.body as {
            username?: string;
            permissions?: Permission[];
        };

        const result = await usersService.createNonAdminUser({
            username: username ?? '',
            permissions: permissions ?? [],
        });

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};