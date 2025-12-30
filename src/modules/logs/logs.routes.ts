import { Router } from 'express';
import { getLogsController, getLogByUuidController } from './logs.controller';

const logsRouter = Router();

logsRouter.get('/', getLogsController);
logsRouter.get('/:uuid', getLogByUuidController);

export default logsRouter;