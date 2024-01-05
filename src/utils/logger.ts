interface ILogger {
    log: (message: any, ...optionalParams: any[]) => void;
    error: (message: any, ...optionalParams: any[]) => void;
    warn: (message: any, ...optionalParams: any[]) => void;
}

const logger: ILogger = {
    log: (message, ...optionalParams) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(message, ...optionalParams);
        }
    },
    error: (message, ...optionalParams) => {
        if (process.env.NODE_ENV !== 'production') {
            console.error(message, ...optionalParams);
        }
    },
    warn: (message, ...optionalParams) => {
        if (process.env.NODE_ENV !== 'production') {
            console.warn(message, ...optionalParams);
        }
    }
};

export default logger;
