import React from 'react';
import {useCurrentFrame, random} from 'remotion';
import {ComparisonScene} from './ComparisonScene';
import {TechPopup} from './TechPopup';

export const Sequence4: React.FC = () => {
	const frame = useCurrentFrame();

	const topBounce = Math.sin(frame * 0.1) * 20;
	const bottomShake = (random(frame) - 0.5) * 50;

	const topContent = (
		<div
			style={{
				width: '100%',
				height: '100%',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					position: 'absolute',
					fontSize: '200px',
					opacity: 0.1,
					color: '#76B900',
					transform: `translateY(${topBounce}px)`,
				}}
			>
				🛡️
			</div>

			<div
				style={{
					position: 'relative',
					zIndex: 10,
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<TechPopup
					title="原生 FP8 引擎"
					desc="硬件级低精度支持。动态拦截计算溢出，兼顾极致速度与模型不崩盘。"
					color="#76B900"
				/>
			</div>
		</div>
	);

	const bottomContent = (
		<div
			style={{
				width: '100%',
				height: '100%',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					position: 'absolute',
					fontSize: '200px',
					opacity: 0.1,
					color: '#C60020',
					transform: `translateX(${bottomShake}px)`,
				}}
			>
				💥
			</div>

			<div
				style={{
					position: 'relative',
					zIndex: 10,
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<TechPopup
					title="软件级模拟 FP8"
					desc="缺乏原生安全网。极易出现“算数跑飞”，需强行研发动态防爆代码，步步惊心。"
					color="#C60020"
				/>
			</div>
		</div>
	);

	return (
		<ComparisonScene topContent={topContent} bottomContent={bottomContent} />
	);
};
