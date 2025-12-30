import { randomUUID } from 'crypto';
import {
	createLog,
	findLogByUuid,
	findLogsByTimestampRange,
	Type,
} from './logs.repository';

export interface CreateLogRequest {
	timestamp: number;
	// uuid: string;
	type: Type;
	message: string;
}

export interface CreateLogResponse {
	timestamp: number;
	uuid: string;
	type: Type;
	message: string;
}

export class LogsService {
	async getLogs(fromTimestamp?: number, toTimestamp?: number) {
        
		if (
			fromTimestamp !== undefined &&
			toTimestamp !== undefined &&
			fromTimestamp > toTimestamp
		) {
			throw new Error('fromTimestamp cannot be greater than toTimestamp');
		}

		const logs = await findLogsByTimestampRange(fromTimestamp, toTimestamp);

		return logs.map((log) => ({
			uuid: log.uuid,
			time: new Date(log.timestamp).toISOString(),
			type: log.type as Type,
			message: log.message,
		}));
	}

	async getLogByUuid(uuid: string) {
		const log = await findLogByUuid(uuid);

		if (!log) {
			throw new Error('Log not found');
		}

		return {
			time: new Date(log.timestamp).toISOString(),
			type: log.type as Type,
			message: log.message,
		};
	}

	async createLog(input: CreateLogRequest): Promise<CreateLogResponse> {
		const { timestamp, type, message } = input;

		if (!timestamp || typeof timestamp !== 'number') {
			throw new Error('Timestamp is required and must be a number');
		}

		const uuid = randomUUID();

		const createdLog = await createLog({
			timestamp,
			uuid,
			type,
			message,
		});

		return {
			timestamp: createdLog.timestamp,
			uuid: createdLog.uuid,
			type: createdLog.type,
			message: createdLog.message,
		};
	}

    async logEvent(type: Type, message: string, requester?: string) {
    await createLog({
      timestamp: Date.now(),
      uuid: randomUUID(),
      type,
      message: requester ? `[${requester}] ${message}` : message
    });
  }
}

export const logsService = new LogsService();
