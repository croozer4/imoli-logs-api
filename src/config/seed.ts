import fs from 'fs';
import path from 'path';
import { User } from '@/modules/users/user.schema';
import logger from '@/utils/logger';

export const seedDatabase = async (): Promise<void> => {
    try {
        const count = await User.countDocuments();

        if (count > 0) {
            logger.info('Database already seeded. Skipping seeding process.');
            return;
        }

        const usersPath = path.join(process.cwd(), 'data', 'users.json');
        const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

        await User.insertMany(usersData);
        logger.info(`Seeded ${usersData.length} users`);
    } catch (err) {
        logger.error('Failed to seed database', err as any);
        throw err;
    }
};