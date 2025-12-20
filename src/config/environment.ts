const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
};

const config = {
	env: process.env.NODE_ENV || 'development',
	port: parseInt(process.env.PORT || '4000'),
	host: process.env.HOST || 'localhost',
	clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
	logLevel: process.env.LOG_LEVEL || 'info',
	mongodbUri: required(process.env.MONGODB_URI, 'MONGODB_URI'),
	isDevelopment: process.env.NODE_ENV === 'development',
	isProduction: process.env.NODE_ENV === 'production',
	isTest: process.env.NODE_ENV === 'test',
} as const;

export default config;
