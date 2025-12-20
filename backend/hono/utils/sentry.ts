import * as Sentry from "@sentry/bun"
import { env } from "bun"

const colors: Record<string, string> = {
	error: "\x1b[31m",
	fatal: "\x1b[33m",
	info: "\x1b[34m",
	debug: "\x1b[32m",
	trace: "\x1b[0m",
	warn: "\x1b[35m",
}

// Ensure to call this before importing any other modules!
Sentry.init({
	environment: env.APP_ENV || "development",

	release: "v1.0.0",

	dsn: env.SENTRY_DSN,

	// Adds request headers and IP for users, for more info visit:
	// https://docs.sentry.io/platforms/javascript/guides/bun/configuration/options/#sendDefaultPii
	sendDefaultPii: true,

	// Add Performance Monitoring by setting tracesSampleRate
	// Set tracesSampleRate to 1.0 to capture 100% of transactions
	// We recommend adjusting this value in production
	// Learn more at
	// https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
	tracesSampleRate: 1.0,

	// Enable logs to be sent to Sentry
	enableLogs: true,

	beforeSendLog: (log) => {
		console.log(
			`${colors[log.level as string]}[${log.level.toUpperCase()}]\x1b[0m`,
			log.message,
			log.attributes?.error || "",
		)
		return log
	},
})
