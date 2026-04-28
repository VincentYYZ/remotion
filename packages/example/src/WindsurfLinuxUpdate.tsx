import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const codeBlockStyle: React.CSSProperties = {
	backgroundColor: '#2f3434',
	borderRadius: 14,
	color: '#f5f7f7',
	fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
	fontSize: 24,
	padding: '22px 26px',
	boxShadow: '0 10px 24px rgba(0, 0, 0, 0.14)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 20,
};

const CopyIcon: React.FC = () => {
	return (
		<div
			style={{
				width: 54,
				height: 54,
				borderRadius: 8,
				backgroundColor: 'rgba(255,255,255,0.08)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
				flexShrink: 0,
			}}
		>
			<div
				style={{
					position: 'absolute',
					width: 15,
					height: 15,
					borderRadius: 3,
					border: '2px solid rgba(255,255,255,0.85)',
					transform: 'translate(4px, 4px)',
				}}
			/>
			<div
				style={{
					width: 15,
					height: 15,
					borderRadius: 3,
					border: '2px solid rgba(255,255,255,0.85)',
					transform: 'translate(-4px, -4px)',
				}}
			/>
		</div>
	);
};

const CommandBlock: React.FC<{
	readonly command: string;
	readonly delay: number;
}> = ({command, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const entrance = spring({
		fps,
		frame: Math.max(0, frame - delay),
		config: {
			damping: 14,
			stiffness: 120,
			mass: 0.8,
		},
	});

	const opacity = interpolate(entrance, [0, 1], [0, 1]);
	const translateY = interpolate(entrance, [0, 1], [28, 0]);
	const scale = interpolate(entrance, [0, 1], [0.96, 1]);

	return (
		<div
			style={{
				...codeBlockStyle,
				opacity,
				transform: `translateY(${translateY}px) scale(${scale})`,
			}}
		>
			<div>{command}</div>
			<CopyIcon />
		</div>
	);
};

export const WindsurfLinuxUpdate: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const panelEnter = spring({
		fps,
		frame,
		config: {
			damping: 16,
			stiffness: 110,
			mass: 0.9,
		},
	});

	const titleEnter = spring({
		fps,
		frame: Math.max(0, frame - 10),
		config: {
			damping: 13,
			stiffness: 130,
			mass: 0.8,
		},
	});

	const panelOpacity = interpolate(panelEnter, [0, 1], [0, 1]);
	const panelScale = interpolate(panelEnter, [0, 1], [0.94, 1]);
	const panelTranslateY = interpolate(panelEnter, [0, 1], [36, 0]);
	const titleOpacity = interpolate(titleEnter, [0, 1], [0, 1]);
	const titleTranslateY = interpolate(titleEnter, [0, 1], [20, 0]);
	const accentWidth = interpolate(frame, [0, 40], [0, 220], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#efe5d2',
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
				color: '#0b0f14',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: 1160,
					minHeight: 720,
					backgroundColor: '#ffffff',
					borderRadius: 22,
					border: '1px solid #d4d0c7',
					boxShadow: '0 18px 40px rgba(90, 74, 49, 0.12)',
					padding: '52px 56px 44px 56px',
					boxSizing: 'border-box',
					opacity: panelOpacity,
					transform: `translateY(${panelTranslateY}px) scale(${panelScale})`,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 5,
						width: accentWidth,
						background:
							'linear-gradient(90deg, #5d7ef7 0%, #7fa4ff 60%, rgba(127,164,255,0) 100%)',
					}}
				/>
				<div
					style={{
						fontSize: 30,
						fontWeight: 600,
						textAlign: 'center',
						marginBottom: 44,
						opacity: titleOpacity,
						transform: `translateY(${titleTranslateY}px)`,
					}}
				>
					Updating Windsurf Editor on Linux
				</div>
				<div
					style={{
						fontSize: 20,
						lineHeight: 1.5,
						marginBottom: 30,
						maxWidth: 720,
					}}
				>
					Did you install using apt or apt-get? If so...
				</div>
				<div
					style={{
						fontSize: 22,
						fontWeight: 500,
						marginBottom: 16,
					}}
				>
					1. Update package lists
				</div>
				<CommandBlock command="sudo apt-get update" delay={18} />
				<div
					style={{
						fontSize: 22,
						fontWeight: 500,
						marginTop: 34,
						marginBottom: 16,
					}}
				>
					2. Upgrade Windsurf
				</div>
				<CommandBlock command="sudo apt-get install windsurf" delay={34} />
				<div
					style={{
						fontSize: 18,
						lineHeight: 1.6,
						marginTop: 74,
						color: '#191f28',
						opacity: interpolate(frame, [45, 70], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Using a non-debian-based distribution? You can download the source tarball{' '}
					<span style={{color: '#4d79ff'}}>here.</span>
				</div>
			</div>
		</AbsoluteFill>
	);
};
