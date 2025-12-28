import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/middleware/auth.middleware';

export const requirePermission = (permission: 'read' | 'create') => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if(!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        if(!req.user.permissions.includes(permission)) {
            res.status(403).json({ message: `Missing ${permission} permission` });
            return;
        }

        next();
    };
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if(!req.user?.isAdmin) {
        res.status(403).json({ message: 'Admin access required' });
        return;
    }

    next();
};