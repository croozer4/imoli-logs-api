import express from 'express';
// import authMiddleware from '@/middleware/auth.middleware';
import errorHandler from '@/middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth middleware na wybranych ścieżkach
// app.use('/public/logs', authMiddleware);
// app.use('/internal/users', authMiddleware);

// Routery podpinaasz tutaj
// app.use('/public/logs', logsRouter);
// app.use('/internal/users', usersRouter);

// Global error handler
app.use(errorHandler);

export default app;
