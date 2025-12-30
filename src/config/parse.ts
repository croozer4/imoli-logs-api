import fs from 'fs';
import path from 'path';
import { Log } from '@/modules/logs/log.schema';
import logger from '@/utils/logger';

interface RawLog {
  timestamp: number;
  uuid: string;
  type: string;
  message: string;
}

const parseLogLine = (line: string): RawLog | null => {

    // console.log('Parsing line:', JSON.stringify(line.slice(0, 100)));
    if (!line.trim()) return null;

    const match = line.match(/^\[(\d+)\] \[([a-f0-9-]+)\] \[(\w+)\] (.*)$/);
    // console.log('Regex match:', match ? 'YES' : 'NO');

    if (!match) return null;

    const [, timestampStr, uuid, type, message] = match;

    return {
        timestamp: parseInt(timestampStr, 10),
        uuid,
        type,
        message,
    }
}

export const parseLogs = async (): Promise<void> => {
    try {
        const count = await Log.countDocuments();

        if (count > 0) {
            logger.info('Database Logs already seeded. Skipping seeding process.');
            return;
        }

        const logsPath = path.join(process.cwd(), 'data', 'events.log');
        const rawContent = fs.readFileSync(logsPath, 'utf-8');
        const lines = rawContent.split('\n');

        const parsedLogs: RawLog[] = [];

        for (const line of lines) {
            const log = parseLogLine(line);
            if (log) {
                parsedLogs.push(log);
            }
        }

        if (parsedLogs.length === 0) {
            logger.warn('No valid logs found to seed.');
            return;
        }

        await Log.insertMany(parsedLogs);
        logger.info(`Seeded ${parsedLogs.length} logs`);
    } catch (err) {
        logger.error('Failed to seed database', err as any);
        throw err;
    }
};