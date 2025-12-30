import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { Permission } from './users.repository';
import { logsService } from '../logs/logs.service';

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

        await logsService.logEvent('info', `User "${result.username}" created`);

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};