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
	const MAX = 1000 // max possible EXP per skill

	const scale = val => Math.min(Math.round((val / MAX) * 100), 100)

	return {
		reading: scale(userEXP.reading),
		listening: scale(userEXP.listening),
		writing: scale(userEXP.writing),
		speaking: scale(userEXP.speaking),
		management: scale(userEXP.management),
	}
}

const IELTSRadarChart = ({ userEXP }) => {
	const stats = getRadarStats(userEXP)

	const data = {
		labels: ['Reading', 'Listening', 'Speaking', 'Writing', 'Management'],
		datasets: [
			{
				label: `Your Profile (${Object.values(userEXP).reduce(
					(a, b) => a + b
				)} XP)`,
				data: [
					stats.reading,
					stats.listening,
					stats.speaking,
					stats.writing,
					stats.management,
				],
				backgroundColor: 'rgba(0, 123, 255, 0.3)',
				borderColor: 'rgba(0, 123, 255, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(0, 123, 255, 1)',
				tension: 0.3,
			},
		],
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		animation: {
			duration: 1000,
			easing: 'easeInOutQuad',
		},
		scales: {
			r: {
				min: 0,
				max: 100,
				ticks: {
					stepSize: 20,
					color: '#eee',
					backdropColor: 'transparent',
				},
				pointLabels: {
					font: {
						size: 14,
					},
					color: '#ccc',
				},
				grid: {
					color: '#555',
				},
				angleLines: {
					color: '#777',
				},
			},
		},
		plugins: {
			tooltip: {
				callbacks: {
					label: ctx => `${ctx.label}: ${ctx.parsed.r}%`,
				},
			},
			legend: {
				display: false,
			},
		},
	}

	const avgScore = Math.round(
		(stats.reading +
			stats.listening +
			stats.speaking +
			stats.writing +
			stats.management) /
			5
	)

	return (
		<div
			style={{
				margin: '0 auto',
				padding: '20px',
			}}
		>
			<div style={{ position: 'relative', height: '400px' }}>
				<Radar data={data} options={options} />
			</div>
			<h2
				style={{
					textAlign: 'center',
					marginTop: '10px',
					color: '#00ffff',
					fontSize: '24px',
				}}
			>
				Average Score: {avgScore}%
			</h2>
		</div>
	)
}

export default IELTSRadarChart
