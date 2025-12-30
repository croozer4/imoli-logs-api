import { Request, Response, NextFunction } from 'express';
import { logsService } from './logs.service';

export interface LogsRequest extends Request {
    uuid?: string;
}

export const getLogsController = async (
    req: LogsRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const from = req.query.from ? parseInt(req.query.from as string, 10) : undefined;
        const to = req.query.to ? parseInt(req.query.to as string, 10) : undefined;

        const logs = await logsService.getLogs(from, to);
        
        if (logs.length === 0) {
            res.status(404).json({ message: 'No logs found in the specified range' });
            return;
        }

        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
};

export const getLogByUuidController = async (
    req: LogsRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { uuid } = req.params;

        if (!uuid) {
            res.status(400).json({ message: 'UUID parameter is required' });
            return;
        }
        const log = await logsService.getLogByUuid(uuid);
        if (!log) {
            res.status(404).json({ message: 'Log not found' });
            return;
        }
        res.status(200).json(log);
    } catch (error) {
        next(error);
    }
};