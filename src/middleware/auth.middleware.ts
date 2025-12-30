import { Request, Response, NextFunction } from "express";
import { User } from "@/modules/users/user.schema";
import logger from "@/utils/logger";
import { logsService } from "@/modules/logs/logs.service";

export interface AuthRequest extends Request {
    user?: {
        username: string;
        token: string;
        permissions: string[];
        isAdmin: boolean;
    };
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers['authorization-token'] as string;

        if (!token) {
            res.status(401).json({ error: 'Missing authorization-token header' });
            await logsService.logEvent('error', `Missing authorization-token header`);
            return;
        }

        const user = await User.findOne({ token });

        if (!user) {
            res.status(401).json({ error: 'Invalid token' });
            await logsService.logEvent('error', `Invalid token attempt: ${token}`);
            return;
        }

        req.user = {
            username: user.username,
            token: user.token,
            permissions: user.permissions,
            isAdmin: user.isAdmin,
        };

        next();
    } catch (err) {
        logger.error('Auth middleware error', err as any);
        res.status(500).json({ error: 'Internal server error' });

    }
};

export default authMiddleware;