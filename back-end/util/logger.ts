import winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
    level: isProduction ? 'info' : 'debug',
    format: isProduction
        ? winston.format.combine(
              winston.format.timestamp(),
              winston.format.errors({ stack: true }),
              winston.format.json()
          )
        : winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp(),
              winston.format.printf(({ level, message, timestamp }) => {
                  return `[${timestamp}] ${level}: ${JSON.stringify(message, null, 2)}`;
              })
          ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' }),
    ],
});
