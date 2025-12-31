import express from 'express';
import authMiddleware from '@/middleware/auth.middleware';
import errorHandler from '@/middleware/errorHandler';
import { requireAdmin, requirePermission } from './middleware/requirePermission';
import usersRouter from './modules/users/users.routes';
import logsRouter from './modules/logs/logs.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.json({
        message: 'IMOLI Logs API 🚀',
        version: '1.0.0',
        endpoints: {
            read_permission: {
                logs: 'GET /public/logs - Wszystkie logi',
                single_log: 'GET /public/logs/:uuid - Pojedynczy log po UUID',
                timestamp_log: 'GET /public/logs?from=timestamp&to=timestamp - Logs z dat'
            },
            admin_access: {
                'user-create': 'POST /internal/users - Create user (admin only)',
            }
        },
        authentication: {
            header: 'authorization-token: YOUR_TOKEN',
            adminToken: '320ca9c4-ed20-4f09-bcb8-9b34b976b501',
            readOnlyToken: 'a5c9700a-684e-11ea-bc55-0242ac130003'
        },
    });
});

app.use('/public/logs', authMiddleware, requirePermission('read'), logsRouter);
app.use('/internal/users', authMiddleware, requireAdmin, usersRouter);

app.use(errorHandler);

export default app;
