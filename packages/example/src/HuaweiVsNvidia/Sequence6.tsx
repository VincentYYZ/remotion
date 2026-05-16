import React from 'react';
import {
	spring,
	useCurrentFrame,
	useVideoConfig,
	AbsoluteFill,
	interpolate,
} from 'remotion';

export const Sequence6: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Transition animation (0 to 60 frames)
	const transitionProgress = spring({
		frame,
		fps,
		config: {damping: 15, stiffness: 60},
		durationInFrames: 60,
	});

	const topHeight = interpolate(transitionProgress, [0, 1], [50, 0]);
	const topOpacity = interpolate(transitionProgress, [0, 0.8], [1, 0]);
	const bottomHeight = interpolate(transitionProgress, [0, 1], [50, 100]);

	// DeepSeek Core Glow Animation
	const coreGlow = interpolate(Math.sin((frame - 60) * 0.1), [-1, 1], [0.5, 1]);
	const coreProgress = spring({
		frame: frame - 60,
		fps,
		config: {damping: 12, stiffness: 100},
	});

	// Text Animation
	const textStr = '从来没有轻而易举的突围';
	const textDelay = 120;

	return (
		<AbsoluteFill style={{backgroundColor: '#000', flexDirection: 'column'}}>
			{/* Top Nvidia Section */}
			<div
				style={{
					height: `${topHeight}%`,
					opacity: topOpacity,
					backgroundColor: '#0a1405',
					borderBottom: '4px solid #76B900',
					overflow: 'hidden',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			></div>

			{/* Bottom Huawei Section */}
			<div
				style={{
					height: `${bottomHeight}%`,
					backgroundColor: '#050202',
					borderTop: topHeight > 0 ? '4px solid #C60020' : 'none',
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				{/* Background racks simulation */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0.2,
						backgroundImage: `repeating-linear-gradient(90deg, #111 0px, #111 50px, #2a0505 50px, #2a0505 52px, #111 52px, #111 100px)`,
						backgroundSize: '100px 100%',
					}}
				/>

				{/* Core Reveal */}
				{frame > 60 && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							transform: `scale(${coreProgress}) translateY(${interpolate(coreProgress, [0, 1], [100, 0])}px)`,
							opacity: coreProgress,
							zIndex: 10,
						}}
					>
						<div
							style={{
								background: '#4d72f9',
								width: '200px',
								height: '200px',
								borderRadius: '30px',
								boxShadow: `0 0 ${100 * coreGlow}px ${50 * coreGlow}px #4d72f9`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'white',
								fontSize: '36px',
								fontWeight: 'bold',
								marginBottom: '80px',
								border: '4px solid #fff',
							}}
						>
							DeepSeek
						</div>
					</div>
				)}

				{/* Text Reveal */}
				{frame > textDelay && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							gap: '10px',
							zIndex: 10,
						}}
					>
						{textStr.split('').map((char, i) => {
							const charProgress = spring({
								frame: frame - textDelay - i * 5,
								fps,
								config: {damping: 12, stiffness: 200},
							});

							return (
								<span
									key={i}
									style={{
										fontSize: '80px',
										fontWeight: 'bold',
										color: 'white',
										textShadow: '0 0 20px #C60020',
										transform: `scale(${charProgress})`,
										opacity: charProgress,
									}}
								>
									{char}
								</span>
							);
						})}
					</div>
				)}
			</div>
		</AbsoluteFill>
	);
};
