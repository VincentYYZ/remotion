import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const TechPopup: React.FC<{
	title: string;
	desc: string;
	color: string;
}> = ({title, desc, color}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		frame,
		fps,
		config: {
			damping: 12,
			stiffness: 100,
		},
	});

	return (
		<div
			style={{
				transform: `scale(${progress})`,
				opacity: progress,
				background: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(20px)',
				border: `2px solid ${color}`,
				borderRadius: '24px',
				padding: '40px',
				color: 'white',
				width: '80%',
				maxWidth: '800px',
				boxShadow: `0 0 40px ${color}40`,
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				zIndex: 10,
			}}
		>
			<h2
				style={{
					margin: 0,
					color,
					fontSize: '56px',
					fontWeight: 'bold',
					textShadow: `0 0 10px ${color}`,
				}}
			>
				{title}
			</h2>
			<p
				style={{margin: 0, fontSize: '40px', lineHeight: '1.5', color: '#fff'}}
			>
				{desc}
			</p>
		</div>
	);
};
