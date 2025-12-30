import { Log } from './log.schema';

export type Type = 'info' | 'warn' | 'error';

export interface CreateLogInput {
	timestamp: number;
	uuid: string;
	type: Type;
	message: string;
}

export const findLogByUuid = async (uuid: string) => {
	return Log.findOne({ uuid }).lean();
};

export const findLogsByTimestampRange = async (
	fromTimestamp?: number,
	toTimestamp?: number,
): Promise<any[]> => {
	const query: any = {};

	if (fromTimestamp !== undefined) {
		query.timestamp = { $gte: fromTimestamp };
	}
	if (toTimestamp !== undefined) {
		query.timestamp = { ...query.timestamp, $lte: toTimestamp };
	}

	return Log.find(query).sort({ timestamp: 1 }).lean();
};

export const createLog = async (data: CreateLogInput) => {
	const log = new Log(data);
	await log.save();
	return log.toObject();
};
