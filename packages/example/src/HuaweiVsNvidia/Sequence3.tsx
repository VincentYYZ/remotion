import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {ComparisonScene} from './ComparisonScene';
import {TechPopup} from './TechPopup';

export const Sequence3: React.FC = () => {
	const frame = useCurrentFrame();

	const topDataFlow = interpolate(frame % 30, [0, 30], [-100, 100]);
	const bottomTrafficJam = frame % 60 < 30 ? 0.8 : 0.2;

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
					fontSize: '150px',
					opacity: 0.15,
					color: '#76B900',
					transform: `translateX(${topDataFlow}vw)`,
				}}
			>
				🚀
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
					title="NVLink + NCCL 调度"
					desc="完美的软硬协同通信。极高互联带宽+极低延迟路由，数据穿梭0卡顿。"
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
					fontSize: '150px',
					opacity: 0.15 * bottomTrafficJam,
					color: '#C60020',
					transform: `translateX(${-topDataFlow * 0.2}vw)`,
				}}
			>
				🚛
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
					title="星河无损以太网 + HCCL"
					desc="物理运力巨大，但极易拥堵，全靠人工彻夜打磨通信流水线。"
					color="#C60020"
				/>
			</div>
		</div>
	);

	return (
		<ComparisonScene topContent={topContent} bottomContent={bottomContent} />
	);
};
