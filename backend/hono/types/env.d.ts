declare global {
	namespace NodeJS {
		interface ProcessEnv {
			APP_ENV: string
			DATABASE_URL?: string
			SENTRY_DSN?: string
		}
	}
}

export {}
