import logRouter from './log//logs.routes.js';
import collectRouter from './collect/collect.routes.js';

export const bootstrap = (app) => {
    app.use('/event/api/logs', collectRouter);
    app.use('/event/api/logs', logRouter);
}