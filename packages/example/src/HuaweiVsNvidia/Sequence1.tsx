import React from 'react';
import {spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {ComparisonScene} from './ComparisonScene';

const Logo: React.FC<{text: string; color: string; delay: number}> = ({
	text,
	color,
	delay,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: {damping: 12, stiffness: 100},
	});

	return (
		<div
			style={{
				transform: `scale(${progress}) translateY(${interpolate(progress, [0, 1], [50, 0])}px)`,
				opacity: progress,
				background: `linear-gradient(45deg, ${color}40, ${color}80)`,
				border: `2px solid ${color}`,
				borderRadius: '20px',
				padding: '20px 40px',
				fontSize: '48px',
				fontWeight: 'bold',
				color: 'white',
				boxShadow: `0 0 20px ${color}40`,
				margin: '0 20px',
			}}
		>
			{text}
		</div>
	);
};

export const Sequence1: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const h100Progress = spring({
		frame: frame - 120,
		fps,
		config: {damping: 12, stiffness: 80},
	});

	const topContent = (
		<div
			style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					opacity: interpolate(h100Progress, [0, 0.5], [1, 0]),
					transform: `scale(${interpolate(h100Progress, [0, 1], [1, 0.8])})`,
					position: 'absolute',
				}}
			>
				<Logo text="ChatGPT" color="#10a37f" delay={20} />
				<Logo text="Claude" color="#d97757" delay={40} />
				<Logo text="Grok" color="#000000" delay={60} />
			</div>

			<div
				style={{
					opacity: h100Progress,
					transform: `scale(${interpolate(h100Progress, [0, 1], [0.5, 1.2])})`,
					background: 'linear-gradient(135deg, #1a2a12, #76B900)',
					border: '4px solid #76B900',
					borderRadius: '30px',
					padding: '60px 100px',
					boxShadow: '0 0 100px #76B900',
					position: 'absolute',
					textAlign: 'center',
				}}
			>
				<h1 style={{color: 'white', fontSize: '80px', margin: 0}}>
					NVIDIA H100
				</h1>
				<p style={{color: '#a0ffa0', fontSize: '40px', margin: 0}}>
					Comfort Zone
				</p>
			</div>
		</div>
	);

	const bottomContent = (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			<div
				style={{
					opacity: interpolate(frame, [60, 90], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
					transform: `scale(1.2)`,
					background: 'linear-gradient(135deg, #2a0505, #C60020)',
					border: '4px solid #C60020',
					borderRadius: '30px',
					padding: '60px 100px',
					boxShadow: '0 0 100px #C6002040',
					position: 'absolute',
					textAlign: 'center',
				}}
			>
				<h1 style={{color: 'white', fontSize: '80px', margin: 0}}>
					Ascend 910B/C
				</h1>
				<p style={{color: '#ff8080', fontSize: '40px', margin: 0}}>Hard Path</p>
			</div>

			<div
				style={{
					position: 'absolute',
					transform: `translateY(${interpolate(frame, [80, 120], [200, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'})}px)`,
					opacity: interpolate(frame, [80, 120], [0, 1], {
						extrapolateRight: 'clamp',
						extrapolateLeft: 'clamp',
					}),
				}}
			>
				<Logo text="DeepSeek" color="#4d72f9" delay={100} />
			</div>
		</div>
	);

	return (
		<ComparisonScene topContent={topContent} bottomContent={bottomContent} />
	);
};
