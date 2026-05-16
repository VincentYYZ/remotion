import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ComparisonScene} from './ComparisonScene';
import {TechPopup} from './TechPopup';

export const Sequence5: React.FC = () => {
	const frame = useCurrentFrame();

	const topFlow = (frame * 5) % 100;
	const bottomStruggle = (frame * 2) % 100;

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
					background: `linear-gradient(90deg, transparent ${100 - topFlow}%, #76B900 ${100 - topFlow + 10}%, transparent ${100 - topFlow + 20}%)`,
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				🟩🟩🟩🟩🟩🟩
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
					title="高 MTBF 集群容错"
					desc="极高的平均无故障时间，成熟的自动错误定位与毫秒级断点恢复机制。"
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
					background: `linear-gradient(90deg, transparent ${100 - bottomStruggle}%, #C60020 ${100 - bottomStruggle + 10}%, transparent ${100 - bottomStruggle + 20}%)`,
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				🟥🟥⬛🟥🟥⬛
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
					title="保姆式联合排障"
					desc="缺乏长期万卡训练沉淀。需要两家最顶尖专家组成突击队，24小时贴身应对死机风险。"
					color="#C60020"
				/>
			</div>
		</div>
	);

	return (
		<ComparisonScene topContent={topContent} bottomContent={bottomContent} />
	);
};
