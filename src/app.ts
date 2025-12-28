import express from 'express';
import authMiddleware from '@/middleware/auth.middleware';
import errorHandler from '@/middleware/errorHandler';
import { requireAdmin, requirePermission } from './middleware/requirePermission';
import usersRouter from './modules/users/users.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protected routes
// app.use('/public/logs', authMiddleware), requirePermission('read');
// app.use('/internal/users', authMiddleware), requireAdmin;

app.use('/public/logs', authMiddleware, requirePermission('read'));
app.use('/internal/users', authMiddleware, requireAdmin, usersRouter);

// Routery podpinaasz tutaj
// app.use('/public/logs', logsRouter);
// app.use('/internal/users', usersRouter);

// Global error handler
app.use(errorHandler);

export default app;
