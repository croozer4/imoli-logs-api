import express from 'express';
import authMiddleware from '@/middleware/auth.middleware';
import errorHandler from '@/middleware/errorHandler';
import { requireAdmin, requirePermission } from './middleware/requirePermission';
import usersRouter from './modules/users/users.routes';
import logsRouter from './modules/logs/logs.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/public/logs', authMiddleware, requirePermission('read'), logsRouter);
app.use('/internal/users', authMiddleware, requireAdmin, usersRouter);

app.use(errorHandler);

export default app;
