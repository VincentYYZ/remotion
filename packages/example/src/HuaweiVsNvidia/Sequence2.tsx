import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {ComparisonScene} from './ComparisonScene';
import {TechPopup} from './TechPopup';

export const Sequence2: React.FC = () => {
	const frame = useCurrentFrame();

	const gearRotation = interpolate(frame, [0, 600], [0, 360 * 5]);
	const sparkFlicker = Math.sin(frame * 0.5) > 0 ? 1 : 0.4;

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
					transform: `rotate(${gearRotation}deg)`,
				}}
			>
				⚙️
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
					title="CUDA 生态"
					desc="极度成熟的底层算子库，海量开源代码开箱即用，研发如履平地。"
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
					opacity: 0.1 * sparkFlicker,
					color: '#C60020',
					transform: `rotate(${-gearRotation * 0.5}deg)`,
				}}
			>
				🔨
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
					title="CANN / Ascend C 架构"
					desc="生态荒原。复杂的底层核心算子无法直接移植，全靠顶尖工程师用华为语言逐行推翻重写。"
					color="#C60020"
				/>
			</div>
		</div>
	);

	return (
		<ComparisonScene topContent={topContent} bottomContent={bottomContent} />
	);
};
