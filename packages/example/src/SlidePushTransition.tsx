import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const SceneA: React.FC = () => (
	<AbsoluteFill
		style={{
			background: 'linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<div
			style={{
				fontSize: 96,
				fontWeight: 700,
				color: '#ffffff',
				fontFamily: 'sans-serif',
				letterSpacing: 8,
				textShadow: '0 4px 32px rgba(59,130,246,0.5)',
			}}
		>
			Scene A
		</div>
	</AbsoluteFill>
);

const SceneB: React.FC = () => (
	<AbsoluteFill
		style={{
			background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<div
			style={{
				fontSize: 96,
				fontWeight: 700,
				color: '#ffffff',
				fontFamily: 'sans-serif',
				letterSpacing: 8,
				textShadow: '0 4px 32px rgba(168,85,247,0.5)',
			}}
		>
			Scene B
		</div>
	</AbsoluteFill>
);

export const SlidePushTransition: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 150},
	});

	const aTranslateX = progress * 1920;
	const bTranslateX = -1920 + progress * 1920;

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			<AbsoluteFill style={{transform: `translateX(${aTranslateX}px)`}}>
				<SceneA />
			</AbsoluteFill>
			<AbsoluteFill style={{transform: `translateX(${bTranslateX}px)`}}>
				<SceneB />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
