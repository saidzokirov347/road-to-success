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
import './RadarChart.css'

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

export function IELTSRadarChart({ userEXP }) {
	if (!userEXP) return null

	const stats = getRadarStats(userEXP)

	const data = {
		labels: Object.keys(stats),
		datasets: [
			{
				label: 'Skill %',
				data: Object.values(stats),
				backgroundColor: 'rgba(0, 0, 0, 0.05)',
				borderColor: '#000',
				borderWidth: 2,
				pointBackgroundColor: '#000',
				pointBorderColor: '#fff',
				pointRadius: 4,
			},
		],
	}

	const options = {
		scales: {
			r: {
				min: 0,
				max: 100,
				grid: { circular: false, color: '#ccc' },
				angleLines: { color: '#ccc' },
				ticks: { display: false },
				pointLabels: {
					color: '#222',
					font: { size: 13, weight: 'bold' },
				},
			},
		},
		plugins: {
			legend: { display: false },
			tooltip: {
				enabled: true,
				callbacks: {
					label: function (context) {
						const label = context.chart.data.labels[context.dataIndex]
						const value = context.formattedValue
						return `${label}: ${value}%`
					},
				},
			},
		},
		responsive: false,
		maintainAspectRatio: true,
	}

	return (
		<div className='radar-wrapper'>
			<Radar data={data} options={options} />
		</div>
	)
}
