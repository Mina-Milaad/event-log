import logRouter from './log//logs.routes.js';
import collectRouter from './collect/collect.routes.js';

export const bootstrap = (app) => {
    app.use('/api/logs', collectRouter);
    app.use('/api/logs', logRouter);
}