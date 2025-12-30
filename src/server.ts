import 'dotenv/config';
import app from './app';

import config from '@/config/environment';
import logger from '@/utils/logger';
import { connectDatabase } from '@/config/database';
import { seedDatabase } from './config/seed';
import { parseLogs } from './config/parse';
// import logsRouter from '@/modules/logs/logs.router';
// import usersRouter from '@/modules/users/users.router';


const startServer = async (): Promise<void> => {
	try {
		await connectDatabase();
		await seedDatabase();
		await parseLogs();

		const server = app.listen(config.port, () => {
			logger.info(
				`Server running in ${config.env} mode at http://${config.host}:${config.port}`,
			);
		});

		// app.use('/public/logs', logsRouter);
		// app.use('/internal/users', usersRouter);

		const shutdown = async (signal: string): Promise<void> => {
			logger.info(`${signal} received. Shutting down gracefully...`);

			server.close(async () => {
				await connectDatabase();
				logger.info('Server closed.');
				process.exit(0);
			});

			setTimeout(() => {
				logger.error('Forced shutdown after timeout');
				process.exit(1);
			}, 10000);
		};

		process.on('SIGINT', () => shutdown('SIGINT'));
		process.on('SIGTERM', () => shutdown('SIGTERM'));
	} catch (error) {
		logger.error('Failed to start server:', error as any);
		process.exit(1);
	}
};

startServer();
