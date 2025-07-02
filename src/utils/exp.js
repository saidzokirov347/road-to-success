import { LEVEL_THRESHOLDS, MAX_LEVEL } from '../constants/user'

export function getCorrectLevel(exp) {
	let level = 1
	for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
		if (exp >= LEVEL_THRESHOLDS[i]) level = i + 1
	}
	return Math.min(level, MAX_LEVEL)
}

export function getExpRangeForLevel(level) {
	const safeLevel = Math.min(level, MAX_LEVEL)
	const minExp = LEVEL_THRESHOLDS[safeLevel - 1]
	const maxExp = LEVEL_THRESHOLDS[safeLevel]
	return { minExp, maxExp }
}
