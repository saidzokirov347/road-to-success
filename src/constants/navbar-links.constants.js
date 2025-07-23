import {
	BadgeQuestionMark,
	BookOpen,
	CalendarFold,
	Headphones,
	House,
	Mic2,
	NotebookPen,
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
	{ to: '/writing-tasks', label: 'Pratice', icon: NotebookPen },
]
