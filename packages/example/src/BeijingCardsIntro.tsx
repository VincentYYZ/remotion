import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

type CardDefinition = {
	title: string;
	description: string;
	accent: string;
	shadow: string;
	icon: React.ReactNode;
};

const FoodIcon: React.FC = () => (
	<svg viewBox="0 0 160 160" style={{width: 120, height: 120}}>
		<defs>
			<linearGradient id="food-bowl" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stopColor="#fff7ed" />
				<stop offset="100%" stopColor="#fdba74" />
			</linearGradient>
		</defs>
		<path
			d="M36 92C36 118 56 132 80 132C104 132 124 118 124 92"
			fill="url(#food-bowl)"
			stroke="#7c2d12"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M48 86H112"
			stroke="#7c2d12"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M58 42C52 56 54 66 66 76"
			stroke="#fde68a"
			strokeWidth="7"
			strokeLinecap="round"
			fill="none"
		/>
		<path
			d="M80 34C74 48 76 60 88 72"
			stroke="#fef08a"
			strokeWidth="7"
			strokeLinecap="round"
			fill="none"
		/>
		<path
			d="M102 42C96 56 98 66 110 76"
			stroke="#fde68a"
			strokeWidth="7"
			strokeLinecap="round"
			fill="none"
		/>
		<path
			d="M118 26L102 76"
			stroke="#f8fafc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M132 26L116 76"
			stroke="#f8fafc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
	</svg>
);

const FunIcon: React.FC = () => (
	<svg viewBox="0 0 160 160" style={{width: 120, height: 120}}>
		<defs>
			<linearGradient id="fun-wheel" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stopColor="#dbeafe" />
				<stop offset="100%" stopColor="#60a5fa" />
			</linearGradient>
		</defs>
		<circle
			cx="80"
			cy="78"
			r="34"
			fill="none"
			stroke="url(#fun-wheel)"
			strokeWidth="8"
		/>
		<circle cx="80" cy="78" r="7" fill="#ffffff" />
		<path
			d="M80 44V112M46 78H114M56 54L104 102M104 54L56 102"
			stroke="#bfdbfe"
			strokeWidth="5"
			strokeLinecap="round"
		/>
		<path
			d="M80 112L54 138"
			stroke="#ffffff"
			strokeWidth="7"
			strokeLinecap="round"
		/>
		<path
			d="M80 112L106 138"
			stroke="#ffffff"
			strokeWidth="7"
			strokeLinecap="round"
		/>
		<path
			d="M44 138H116"
			stroke="#ffffff"
			strokeWidth="7"
			strokeLinecap="round"
		/>
		<circle cx="80" cy="24" r="12" fill="#f9a8d4" />
		<circle cx="124" cy="52" r="10" fill="#c4b5fd" />
		<circle cx="36" cy="52" r="10" fill="#86efac" />
	</svg>
);

const ConvenienceIcon: React.FC = () => (
	<svg viewBox="0 0 160 160" style={{width: 120, height: 120}}>
		<defs>
			<linearGradient id="metro-body" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stopColor="#ecfeff" />
				<stop offset="100%" stopColor="#67e8f9" />
			</linearGradient>
		</defs>
		<rect
			x="40"
			y="28"
			width="80"
			height="84"
			rx="24"
			fill="url(#metro-body)"
			stroke="#0f172a"
			strokeWidth="6"
		/>
		<rect
			x="54"
			y="44"
			width="52"
			height="24"
			rx="10"
			fill="#0f172a"
			opacity="0.9"
		/>
		<circle cx="62" cy="90" r="8" fill="#0f172a" />
		<circle cx="98" cy="90" r="8" fill="#0f172a" />
		<path
			d="M62 112L52 132"
			stroke="#f8fafc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M98 112L108 132"
			stroke="#f8fafc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M48 132H112"
			stroke="#f8fafc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M18 48H34"
			stroke="#a5f3fc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M14 80H34"
			stroke="#a5f3fc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M126 48H142"
			stroke="#a5f3fc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
		<path
			d="M126 80H146"
			stroke="#a5f3fc"
			strokeWidth="6"
			strokeLinecap="round"
		/>
	</svg>
);

const cards: CardDefinition[] = [
	{
		title: '好吃',
		description: '夜市香气与在地小馆，一口就记住北京。',
		accent:
			'linear-gradient(180deg, rgba(251,146,60,0.28) 0%, rgba(124,45,18,0.10) 100%)',
		shadow: '0 28px 80px rgba(249,115,22,0.24)',
		icon: <FoodIcon />,
	},
	{
		title: '好玩',
		description: '白天逛街看展，夜晚继续把城市玩到发光。',
		accent:
			'linear-gradient(180deg, rgba(96,165,250,0.28) 0%, rgba(37,99,235,0.10) 100%)',
		shadow: '0 28px 80px rgba(59,130,246,0.24)',
		icon: <FunIcon />,
	},
	{
		title: '又方便',
		description: '捷运、公车与步行串起每个精彩角落。',
		accent:
			'linear-gradient(180deg, rgba(34,211,238,0.28) 0%, rgba(8,145,178,0.10) 100%)',
		shadow: '0 28px 80px rgba(34,211,238,0.24)',
		icon: <ConvenienceIcon />,
	},
];

const BeijingCardsScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleProgress = spring({
		frame: frame - 6,
		fps,
		config: {damping: 14, stiffness: 110},
	});

	const subtitleOpacity = interpolate(frame, [18, 34], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at top, #1e3a8a 0%, #0f172a 45%, #020617 100%)',
				color: '#f8fafc',
				fontFamily: 'sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '80px 90px',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.20), transparent 28%), radial-gradient(circle at 80% 18%, rgba(244,114,182,0.16), transparent 24%), radial-gradient(circle at 50% 82%, rgba(250,204,21,0.14), transparent 30%)',
				}}
			/>
			<div
				style={{
					width: '100%',
					maxWidth: 1620,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					zIndex: 1,
				}}
			>
				<div
					style={{
						opacity: titleProgress,
						transform: `translateY(${interpolate(titleProgress, [0, 1], [42, 0])}px) scale(${interpolate(titleProgress, [0, 1], [0.92, 1])})`,
						fontSize: 132,
						fontWeight: 800,
						letterSpacing: '0.18em',
						textShadow: '0 16px 48px rgba(59,130,246,0.28)',
						marginBottom: 18,
						paddingLeft: '0.18em',
					}}
				>
					北京
				</div>
				<div
					style={{
						opacity: subtitleOpacity,
						fontSize: 30,
						color: 'rgba(226,232,240,0.9)',
						letterSpacing: '0.14em',
						marginBottom: 72,
					}}
				>
					一座讓人想立刻出發的城市
				</div>
				<div
					style={{
						width: '100%',
						display: 'flex',
						gap: 36,
						justifyContent: 'center',
					}}
				>
					{cards.map((card, index) => {
						const delay = 28 + index * 12;
						const progress = spring({
							frame: frame - delay,
							fps,
							config: {damping: 16, stiffness: 120},
						});
						const floatY = Math.sin((frame + index * 9) / 18) * 8;
						const glow = 0.4 + Math.sin((frame + index * 7) / 16) * 0.08;

						return (
							<div
								key={card.title}
								style={{
									flex: 1,
									maxWidth: 480,
									minHeight: 520,
									borderRadius: 40,
									padding: '40px 34px 34px 34px',
									background: `linear-gradient(180deg, rgba(15,23,42,0.90) 0%, rgba(15,23,42,0.74) 100%), ${card.accent}`,
									border: '1px solid rgba(255,255,255,0.14)',
									boxShadow: `${card.shadow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
									backdropFilter: 'blur(18px)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									textAlign: 'center',
									opacity: progress,
									transform: `translateY(${interpolate(progress, [0, 1], [90, floatY])}px) scale(${interpolate(progress, [0, 1], [0.84, 1])})`,
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,${glow * 0.18}), transparent 42%)`,
									}}
								/>
								<div
									style={{
										width: 168,
										height: 168,
										borderRadius: 9999,
										background: 'rgba(255,255,255,0.08)',
										border: '1px solid rgba(255,255,255,0.10)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										marginBottom: 28,
										boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
									}}
								>
									{card.icon}
								</div>
								<div
									style={{
										fontSize: 54,
										fontWeight: 800,
										lineHeight: 1.1,
										marginBottom: 18,
									}}
								>
									{card.title}
								</div>
								<div
									style={{
										fontSize: 24,
										lineHeight: 1.6,
										color: 'rgba(226,232,240,0.88)',
										maxWidth: 360,
									}}
								>
									{card.description}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</AbsoluteFill>
	);
};

export {BeijingCardsScene};
