import winston from 'winston';

const {
  combine, timestamp, printf, colorize, align, prettyPrint,
} = winston.format;

const logger = winston.createLogger({
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,

  },
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({
      format: 'HH-MM:ss YYYY-MM-DD',
    }),
    prettyPrint(),
    colorize(),
    align(),
    printf((info) => `[${info.level}][${info.timestamp}]: ${info.message}`),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;