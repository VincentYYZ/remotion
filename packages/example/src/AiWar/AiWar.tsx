import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
} from 'remotion';

export const AiWar: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();

	const openaiLogo = staticFile('openai.svg');
	const microsoftLogo = staticFile('microsoft-color.svg');

	// Intro animation: 0-60 frames (2s)
	const introProgress = spring({
		frame,
		fps,
		config: {stiffness: 100},
	});

	// Movement towards center: 60-150 frames (3s)
	const clashProgress = spring({
		frame: frame - 60,
		fps,
		config: {stiffness: 50},
	});

	// Competition "shake": 150-300 frames
	const shake = Math.sin(frame / 2) * 5 * Math.min(1, (frame - 150) / 30);

	const openaiX = interpolate(clashProgress, [0, 1], [-width / 4, -width / 10]);
	const microsoftX = interpolate(clashProgress, [0, 1], [width / 4, width / 10]);

	return (
		<AbsoluteFill style={{backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif'}}>
			{/* Background grid/dots */}
			<div
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
					backgroundSize: '40px 40px',
					opacity: 0.3,
				}}
			/>

			{/* Market Arena */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) scale(${introProgress})`,
					width: 600,
					height: 600,
					borderRadius: '50%',
					border: '2px solid rgba(255, 255, 255, 0.1)',
					background: 'radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, transparent 70%)',
				}}
			/>

			<h1
				style={{
					position: 'absolute',
					top: 100,
					width: '100%',
					textAlign: 'center',
					fontSize: 60,
					fontWeight: 'bold',
					opacity: introProgress,
					textShadow: '0 0 20px rgba(255,255,255,0.5)',
				}}
			>
				AI MARKET BATTLE
			</h1>

			{/* OpenAI Side */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) translateX(${openaiX}px) translateY(${shake}px)`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Img
					src={openaiLogo}
					style={{
						width: 150,
						height: 150,
						filter: 'invert(1) drop-shadow(0 0 20px rgba(255,255,255,0.3))',
						transform: `scale(${introProgress})`,
					}}
				/>
				<div style={{marginTop: 20, fontSize: 24, fontWeight: 'bold', opacity: introProgress}}>OpenAI</div>
			</div>

			{/* Microsoft Side */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) translateX(${microsoftX}px) translateY(${-shake}px)`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Img
					src={microsoftLogo}
					style={{
						width: 150,
						height: 150,
						filter: 'drop-shadow(0 0 20px rgba(0,120,215,0.3))',
						transform: `scale(${introProgress})`,
					}}
				/>
				<div style={{marginTop: 20, fontSize: 24, fontWeight: 'bold', opacity: introProgress}}>Microsoft</div>
			</div>

			{/* VS Text */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontSize: 80,
					fontWeight: 'black',
					fontStyle: 'italic',
					color: '#ff3e00',
					opacity: interpolate(frame, [100, 120], [0, 1], {extrapolateLeft: 'clamp'}),
					textShadow: '0 0 30px rgba(255, 62, 0, 0.5)',
				}}
			>
				VS
			</div>

			{/* Progress/Market share info */}
			<div
				style={{
					position: 'absolute',
					bottom: 100,
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					gap: 100,
					opacity: interpolate(frame, [150, 180], [0, 1], {extrapolateLeft: 'clamp'}),
				}}
			>
				<div style={{textAlign: 'center'}}>
					<div style={{fontSize: 40, fontWeight: 'bold'}}>GPT-4o</div>
					<div style={{color: '#888'}}>Market Leader</div>
				</div>
				<div style={{textAlign: 'center'}}>
					<div style={{fontSize: 40, fontWeight: 'bold'}}>Azure AI</div>
					<div style={{color: '#888'}}>Infrastructure Giant</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
