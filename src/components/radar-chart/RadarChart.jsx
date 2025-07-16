import {
	Chart as ChartJS,
	Filler,
	Legend,
	LineElement,
	PointElement,
	RadialLinearScale,
	Tooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
)

function getRadarStats(userEXP) {
	const MAX = 1000

	const scale = val => Math.min(Math.round((val / MAX) * 100), 100)

	return {
		Listening: scale(userEXP.listening),
		Reading: scale(userEXP.reading),
		Speaking: scale(userEXP.speaking),
		Writing: scale(userEXP.writing),
		Management: scale(userEXP.management),
	}
}

export default function IELTSRadarChart({ userEXP }) {
	const stats = getRadarStats(userEXP)

	const data = {
		labels: Object.keys(stats),
		datasets: [
			{
				label: 'Skill %',
				data: Object.values(stats),
				backgroundColor: 'rgba(0, 200, 255, 0.2)', // light blue fill
				borderColor: '#00c8ff', // neon cyan line
				borderWidth: 2,
				pointBackgroundColor: '#00c8ff', // cyan dots
				pointBorderColor: '#00c8ff', // black border around dots
				pointRadius: 4,
			},
		],
	}

	const options = {
		scales: {
			r: {
				min: 0,
				max: 100,
				grid: {
					circular: false,
					color: '#000',
				},
				angleLines: {
					color: '#000',
				},
				ticks: {
					display: false,
				},
				pointLabels: {
					font: {
						size: 14,
						weight: 'bold',
					},
					color: ctx => {
						const label = ctx.label
						switch (label) {
							case 'Listening':
								return '#333'
							case 'Reading':
								return '#333'
							case 'Speaking':
								return '#333'
							case 'Writing':
								return '#333'
							case 'Management':
								return '#333'
							default:
								return '#fff'
						}
					},
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	}

	return (
		<div
			style={{
				width: '100%',
				height: 400,
				color: '#fff',
				borderRadius: '16px',
				position: 'relative',
				padding: '20px',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontSize: '48px',
					fontWeight: 'bold',
					color: '#ccc',
					pointerEvents: 'none',
				}}
			></div>
			<Radar data={data} options={options} />
		</div>
	)
}
