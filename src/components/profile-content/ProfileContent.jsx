import { ProfileSkeleton } from '../../components/skeleton/profile-skeleton/ProfileSkeleton'
import { useUserProfile } from '../../hooks/useUserProfile'
import './ProfileContent.css'

export function ProfileContent() {
	const {
		bio,
		name,
		username,
		profileImage,
		email,
		exp,
		level,
		teacher,
		loading,
		isEditing,
		isSaving,
		usernameError,
		usernameIsNew,
		usernameRef,
		progress,
		levelClass,
		setBio,
		setName,
		setUsername,
		setEmail,
		setTeacher,
		toggleEdit,
		listeningExp,
		readingExp,
		writingExp,
		speakingExp,
	} = useUserProfile()

	console.log(listeningExp)

	if (loading) return <ProfileSkeleton />

	return (
		<div className='profile'>
			<div className='profile-wrapper'>
				<div className='profile-header'>
					<div className='avatar-bg'>
						<img
							src={profileImage || '/men-avatar.jpg'}
							alt='Profile'
							className='profile-image'
						/>
					</div>

					<div className='rank-info'>
						<div className='level-text'>Level {level}</div>
						<div className='rank-progress-bar'>
							<div
								className={`rank-progress-fill ${levelClass}`}
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<small>{exp} EXP</small>
					</div>
				</div>

				<div className='profile-info'>
					<label>Full Name</label>
					<input
						className='profile-input'
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Full Name'
						disabled={!isEditing}
					/>

					<label>Email address</label>
					<input
						className='profile-input'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Email'
						disabled={!isEditing}
					/>

					<label>Username</label>
					<input
						ref={usernameRef}
						className={`profile-input ${usernameError ? 'input-warning' : ''}`}
						value={username}
						onChange={e => {
							const value = e.target.value.toLowerCase().replace(/\s+/g, '')
							setUsername(value)
						}}
						placeholder='Username'
						disabled={!isEditing && !usernameIsNew}
					/>
					{usernameError && (
						<span className='error-text'>Username must not be empty</span>
					)}

					<label>Teacher</label>
					<select
						className={`profile-input ${!teacher ? 'input-warning' : ''}`}
						value={teacher}
						onChange={e => setTeacher(e.target.value)}
						disabled={!isEditing}
					>
						<option value=''>Select your teacher</option>
						<option value='Hilola teacher'>Hilola teacher</option>
						<option value='Madina teacher'>Madina teacher</option>
					</select>
					{!teacher && isEditing && (
						<span className='error-text'>Please select a teacher</span>
					)}

					<label>Bio</label>
					<textarea
						className='profile-bio'
						rows='3'
						placeholder='Write your bio...'
						value={bio}
						onChange={e => setBio(e.target.value)}
						disabled={!isEditing}
					/>
				</div>

				<div className='button-row'>
					<button
						className='save-button'
						onClick={toggleEdit}
						disabled={isSaving}
					>
						{isSaving ? (
							<span className='profile-loader'></span>
						) : isEditing ? (
							<span>Okay</span>
						) : (
							<span>Edit</span>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}
