import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/middleware/auth.middleware';
import { logsService } from '@/modules/logs/logs.service';

export const requirePermission = (permission: 'read' | 'create') => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if(!req.user) {
            logsService.logEvent('info', `User unauthorized access attempt`);
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        if(!req.user.permissions.includes(permission)) {
            logsService.logEvent('warn', `Missing ${permission} permission - user: ${req.user.username}`).catch(() => {});
            res.status(403).json({ message: `Missing ${permission} permission` });
            return;
        }

        next();
    };
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if(!req.user?.isAdmin) {
        logsService.logEvent('warn', `Admin access denied - user: ${req.user?.username || 'unknown'}`).catch(() => {});
        res.status(403).json({ message: 'Admin access required' });
        return;
    }

    next();
};