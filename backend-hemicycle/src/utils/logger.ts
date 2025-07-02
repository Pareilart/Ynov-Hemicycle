import winston from 'winston';

const emojis: Record<string, string> = { error: '🔴', warn: '🟡', info: '🟢', http: '🔵', debug: '⚪' };

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
      const emoji = emojis[info.level] || '📝';
      const service = info.service || 'app';
      return `${emoji} ${info.timestamp} [${info.level.toUpperCase()}] ${service}: ${info.message}`;
    }),
    winston.format.colorize({ all: true }),
  ),
  transports: [new winston.transports.Console()],
  level: 'debug',
});

export const log = {
  error: (msg: string, meta = {}) => logger.error(msg, { service: 'server', ...meta }),
  warn: (msg: string, meta = {}) => logger.warn(msg, { service: 'server', ...meta }),
  info: (msg: string, meta = {}) => logger.info(msg, { service: 'server', ...meta }),
  http: (msg: string, meta = {}) => logger.http(msg, { service: 'http', ...meta }),
  debug: (msg: string, meta = {}) => logger.debug(msg, { service: 'server', ...meta }),
};

export const createServiceLogger = (serviceName: string) => ({
  error: (msg: string, meta = {}) => logger.error(msg, { service: serviceName, ...meta }),
  warn: (msg: string, meta = {}) => logger.warn(msg, { service: serviceName, ...meta }),
  info: (msg: string, meta = {}) => logger.info(msg, { service: serviceName, ...meta }),
});

export default logger;
