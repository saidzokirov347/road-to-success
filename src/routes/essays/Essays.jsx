import { FilePlus } from 'lucide-react'
import './Essays.css'

export function Essays() {
	return (
		<div className='container essays'>
			<button>
				<span>New essay</span>
				<FilePlus />
			</button>
		</div>
	)
}
