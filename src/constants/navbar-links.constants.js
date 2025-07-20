import {
	BadgeQuestionMark,
	BookOpen,
	CalendarFold,
	FileText,
	Headphones,
	House,
	Mic2,
	PenTool,
} from 'lucide-react'

export const navbarLinks = [
	{ to: '/', label: 'Home', icon: House },
	{ to: '/quizzes', label: 'Quizzes', icon: BadgeQuestionMark },
	{ to: '/events', label: 'Events', icon: CalendarFold },
	{ to: '/reading', label: 'Reading', icon: BookOpen },
	{ to: '/listening', label: 'Listening', icon: Headphones },
	{ to: '/speaking', label: 'Speaking', icon: Mic2 },
	{ to: '/writing', label: 'Writing', icon: PenTool },
	{ to: '/essays', label: 'Essays', icon: FileText },
]
