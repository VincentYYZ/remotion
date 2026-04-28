import React from 'react';
import {
	AbsoluteFill,
	Sequence,
	interpolate,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const nvidia = '#76B900';
const huawei = '#C60020';
const font = 'Inter, system-ui, sans-serif';

const Subtitle: React.FC<{readonly text: string}> = ({text}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({fps, frame: frame - 8, config: {damping: 14, stiffness: 120}});

	return (
		<div
			style={{
				position: 'absolute',
				left: 56,
				right: 56,
				bottom: 38,
				padding: '22px 28px',
				borderRadius: 24,
				background: 'rgba(7, 8, 12, 0.62)',
				backdropFilter: 'blur(16px)',
				border: '1px solid rgba(255,255,255,0.12)',
				color: 'white',
				fontSize: 28,
				lineHeight: 1.48,
				textAlign: 'center',
				fontFamily: font,
				opacity: progress,
				transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
				zIndex: 50,
			}}
		>
			{text}
		</div>
	);
};

const ComparisonPanel: React.FC<{
	readonly title: string;
	readonly topText: string;
	readonly bottomText: string;
	readonly delay?: number;
}> = ({title, topText, bottomText, delay = 80}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({fps, frame: frame - delay, config: {damping: 12, stiffness: 150}});

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: `translate(-50%, -50%) scale(${interpolate(progress, [0, 1], [0.86, 1])})`,
				opacity: progress,
				width: 860,
				padding: '22px 24px',
				borderRadius: 28,
				background: 'rgba(255,255,255,0.08)',
				backdropFilter: 'blur(20px)',
				border: '1px solid rgba(255,255,255,0.16)',
				boxShadow: '0 20px 60px rgba(0,0,0,0.24)',
				zIndex: 35,
				fontFamily: font,
			}}
		>
			<div style={{fontSize: 32, fontWeight: 900, color: 'white', textAlign: 'center', marginBottom: 14}}>{title}</div>
			<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
				<div style={{borderRadius: 22, padding: '18px 20px', background: 'rgba(118,185,0,0.16)', border: `1px solid ${nvidia}`, boxShadow: '0 0 24px rgba(118,185,0,0.18)'}}>
					<div style={{fontSize: 16, fontWeight: 800, color: '#d8ffbe', marginBottom: 8}}>TOP / NVIDIA</div>
					<div style={{fontSize: 24, lineHeight: 1.45, color: 'white'}}>{topText}</div>
				</div>
				<div style={{borderRadius: 22, padding: '18px 20px', background: 'rgba(198,0,32,0.16)', border: `1px solid ${huawei}`, boxShadow: '0 0 24px rgba(198,0,32,0.18)'}}>
					<div style={{fontSize: 16, fontWeight: 800, color: '#ffd0d7', marginBottom: 8}}>BOTTOM / HUAWEI</div>
					<div style={{fontSize: 24, lineHeight: 1.45, color: 'white'}}>{bottomText}</div>
				</div>
			</div>
		</div>
	);
};

const SplitScene: React.FC<{
	readonly top: React.ReactNode;
	readonly bottom: React.ReactNode;
	readonly subtitle: string;
	readonly panel?: React.ReactNode;
}> = ({top, bottom, subtitle, panel}) => {
	return (
		<AbsoluteFill style={{backgroundColor: '#020202', fontFamily: font}}>
			<div
				style={{
					flex: 1,
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'radial-gradient(circle at 50% 35%, rgba(118,185,0,0.24), #071004 68%)',
					borderBottom: `3px solid ${nvidia}`,
				}}
			>
				<div style={{position: 'absolute', top: 22, left: 28, color: '#d9ffbf', fontSize: 18, letterSpacing: 2, fontWeight: 900}}>NVIDIA 路线</div>
				{top}
			</div>
			<div
				style={{
					flex: 1,
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'radial-gradient(circle at 50% 35%, rgba(198,0,32,0.24), #120205 68%)',
					borderTop: `3px solid ${huawei}`,
				}}
			>
				<div style={{position: 'absolute', top: 22, left: 28, color: '#ffd3d8', fontSize: 18, letterSpacing: 2, fontWeight: 900}}>ASCEND 路线</div>
				{bottom}
			</div>
			{panel}
			<Subtitle text={subtitle} />
		</AbsoluteFill>
	);
};

const TypewriterQuote: React.FC<{readonly text: string; readonly start: number}> = ({text, start}) => {
	const frame = useCurrentFrame();
	const count = Math.max(0, Math.floor((frame - start) / 4));
	const shown = text.slice(0, count);
	return (
		<div style={{fontSize: 74, fontWeight: 900, color: 'white', textAlign: 'center', lineHeight: 1.18, textShadow: '0 0 28px rgba(198,0,32,0.55)'}}>
			{shown}
		</div>
	);
};

const LogoPill: React.FC<{
	readonly label: string;
	readonly color: string;
	readonly delay: number;
	readonly fromX: number;
}> = ({label, color, delay, fromX}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({fps, frame: frame - delay, config: {damping: 12, stiffness: 150}});
	return (
		<div
			style={{
				padding: '16px 24px',
				borderRadius: 999,
				border: `1px solid ${color}`,
				background: `${color}22`,
				boxShadow: `0 0 24px ${color}55`,
				color: 'white',
				fontSize: 28,
				fontWeight: 800,
				transform: `translateX(${interpolate(progress, [0, 1], [fromX, 0])}px) scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
				opacity: progress,
			}}
		>
			{label}
		</div>
	);
};

const Sequence1: React.FC = () => {
	const frame = useCurrentFrame();
	const top = (
		<>
			<div style={{position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent, rgba(118,185,0,${0.08 + 0.08 * Math.sin(frame / 18)}) 45%, transparent 70%)`, transform: `translateX(${(frame * 18) % 1600 - 400}px)`}} />
			<div style={{display: 'flex', gap: 18, marginTop: -30}}>
				<LogoPill label="ChatGPT" color="#10a37f" delay={8} fromX={-180} />
				<LogoPill label="Claude" color="#d97757" delay={24} fromX={180} />
				<LogoPill label="Grok" color="#ffffff" delay={40} fromX={-140} />
			</div>
		</>
	);
	const bottom = (
		<>
			<div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 60%, rgba(198,0,32,${0.08 + 0.12 * (Math.sin(frame / 12) + 1) / 2}), transparent 45%)`}} />
			<LogoPill label="DeepSeek" color="#4d72f9" delay={24} fromX={0} />
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="全球顶尖的大模型 ChatGPT、Claude、Grok 都在一条铺好的高速公路狂飙，而 DeepSeek，却选择了一条无人区。" />;
};

const Sequence2: React.FC = () => {
	const frame = useCurrentFrame();
	const top = (
		<>
			<div style={{position: 'absolute', width: 540, height: 18, background: 'linear-gradient(90deg, transparent, rgba(118,185,0,0.95), transparent)', transform: `translateX(${(frame * 22) % 1200 - 600}px)`}} />
			<div style={{padding: '40px 54px', borderRadius: 34, border: `2px solid ${nvidia}`, background: 'linear-gradient(135deg, #15240a, #76B900)', boxShadow: '0 0 90px rgba(118,185,0,0.42)', color: 'white', textAlign: 'center'}}>
				<div style={{fontSize: 56, fontWeight: 900}}>NVIDIA H100</div>
				<div style={{fontSize: 28, color: '#dbffb7', marginTop: 10}}>Hopper 架构</div>
			</div>
		</>
	);
	const bottom = (
		<>
			<div style={{position: 'absolute', fontSize: 120, left: 160, top: 92, opacity: Math.sin(frame / 5) > 0 ? 1 : 0.35}}>🔨</div>
			<div style={{padding: '40px 54px', borderRadius: 34, border: `2px solid ${huawei}`, background: 'linear-gradient(135deg, #2d0810, #C60020)', boxShadow: '0 0 80px rgba(198,0,32,0.35)', color: 'white', textAlign: 'center'}}>
				<div style={{fontSize: 56, fontWeight: 900}}>Huawei Ascend</div>
				<div style={{fontSize: 28, color: '#ffd0d7', marginTop: 10}}>达芬奇架构</div>
			</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="这不仅是英伟达与华为昇腾的硬件对决，更是两个完全不同世界的法则碰撞。" panel={<ComparisonPanel title="AI 算力基座" topText="NVIDIA Hopper 架构" bottomText="Huawei Ascend 达芬奇架构" />} />;
};

const Sequence3: React.FC = () => {
	const frame = useCurrentFrame();
	const top = (
		<>
			<div style={{width: 210, height: 260, borderRadius: 18, background: 'linear-gradient(135deg, #10220a, #2f560f)', border: '2px solid rgba(118,185,0,0.45)', boxShadow: '0 0 40px rgba(118,185,0,0.25)', transform: `rotate(${-8 + Math.sin(frame / 30) * 2}deg)`}} />
			{new Array(14).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 520 + i * 18, top: 110 + (i % 4) * 36, fontSize: 24, color: '#d5ffb6', transform: `translate(${frame * (2 + i * 0.15)}px, ${-frame * 0.2}px)`, opacity: 0.7}}>✦</div>)}
		</>
	);
	const bottom = (
		<>
			<div style={{width: 210, height: 260, borderRadius: 18, background: 'linear-gradient(135deg, #3b0b12, #6c1120)', border: '2px solid rgba(198,0,32,0.45)', boxShadow: '0 0 40px rgba(198,0,32,0.25)', transform: `rotate(${6 + Math.sin(frame / 26) * 2}deg)`}} />
			<div style={{position: 'absolute', left: 350, top: 120, fontSize: 64}}>✍️</div>
			<div style={{position: 'absolute', left: 680, top: 240, fontSize: 34, opacity: 0.75}}>💧</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="在英伟达的 CUDA 生态里，有无数现成的代码可以抄作业；而在昇腾的 CANN 里，一切都要从零开始书写。" panel={<ComparisonPanel title="底层编译器生态" topText="CUDA：二十年无敌生态" bottomText="CANN / Ascend C：仍在开荒的新生态" />} />;
};

const Sequence4: React.FC = () => {
	const frame = useCurrentFrame();
	const partX = ((frame * 8) % 900) - 400;
	const top = (
		<>
			<div style={{position: 'absolute', left: 110, right: 110, top: 230, height: 14, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}} />
			<div style={{position: 'absolute', left: 150 + partX, top: 210, width: 80, height: 54, borderRadius: 12, background: '#a7ef63', boxShadow: '0 0 18px rgba(118,185,0,0.55)'}} />
			<div style={{position: 'absolute', right: 170, top: 160, width: 220, height: 140, borderRadius: 28, background: 'linear-gradient(135deg, #17310d, #76B900)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 42, fontWeight: 900}}>Kernel</div>
		</>
	);
	const bottom = (
		<>
			<div style={{width: 180, height: 180, borderRadius: '50%', border: '20px solid #d73b56', boxShadow: '0 0 32px rgba(198,0,32,0.35)'}} />
			<div style={{position: 'absolute', left: 160, bottom: 112, fontSize: 70}}>🧑‍🏭🧑‍🏭</div>
			<div style={{position: 'absolute', right: 180, top: 120, fontSize: 88}}>🔥</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="DeepSeek 极其复杂的底层加速魔法，在昇腾上统统失效，必须由顶尖工程师逐行推翻，手工重铸。" panel={<ComparisonPanel title="底层算子" topText="FlashAttention 等神级算子开箱即用" bottomText="徒手重写 PTX / 汇编级极致优化代码" />} />;
};

const Sequence5: React.FC = () => {
	const frame = useCurrentFrame();
	const toolOpen = interpolate(Math.sin(frame / 16), [-1, 1], [-16, 26]);
	const top = (
		<>
			<div style={{width: 120, height: 240, borderRadius: 999, background: '#d8ffb9', position: 'relative'}}>
				<div style={{position: 'absolute', left: 100, top: 44, width: 140, height: 14, borderRadius: 999, background: '#d8ffb9', transform: `rotate(${toolOpen}deg)`, transformOrigin: 'left center'}} />
				<div style={{position: 'absolute', left: 100, top: 112, width: 120, height: 14, borderRadius: 999, background: '#d8ffb9', transform: `rotate(${-toolOpen}deg)`, transformOrigin: 'left center'}} />
				<div style={{position: 'absolute', left: 100, top: 176, width: 110, height: 14, borderRadius: 999, background: '#d8ffb9', transform: `rotate(${toolOpen * 0.6}deg)`, transformOrigin: 'left center'}} />
			</div>
		</>
	);
	const bottom = (
		<>
			<div style={{width: 420, height: 160, borderRadius: 28, background: 'linear-gradient(135deg, #781122, #C60020)', position: 'relative', boxShadow: '0 0 34px rgba(198,0,32,0.35)'}}>
				<div style={{position: 'absolute', left: -24, bottom: -8, width: 110, height: 110, borderRadius: '50%', background: '#421017', border: '18px solid #c1445a'}} />
				<div style={{position: 'absolute', right: 20, bottom: -8, width: 110, height: 110, borderRadius: '50%', background: '#421017', border: '18px solid #c1445a'}} />
				<div style={{position: 'absolute', top: -54, right: 34, width: 120, height: 80, borderRadius: 18, background: '#e85b72'}} />
			</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="英伟达像一把瑞士军刀，极度灵活；华为达芬奇架构像推土机，暴力输出，但你必须把数据喂成它喜欢的形状。" panel={<ComparisonPanel title="硬件计算单元" topText="SIMT：极度灵活，适应复杂逻辑" bottomText="Da Vinci 3D Cube：计算密度极高，但需高度对齐" />} />;
};

const Sequence6: React.FC = () => {
	const frame = useCurrentFrame();
	const drop = (index: number) => ((frame * (4 + index)) % 260) - 80;
	const top = (
		<>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 58px)', gap: 12}}>{new Array(24).fill(true).map((_, i) => <div key={i} style={{height: 40, borderRadius: 10, background: i % 3 === 0 ? '#9ce257' : '#d8ffb9', opacity: 0.22}} />)}</div>
			{new Array(5).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 270 + i * 70, top: drop(i), width: i % 2 === 0 ? 120 : 58, height: 58, borderRadius: 12, background: '#76B900', boxShadow: '0 0 18px rgba(118,185,0,0.45)'}} />)}
		</>
	);
	const bottom = (
		<>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 58px)', gap: 12}}>{new Array(24).fill(true).map((_, i) => <div key={i} style={{height: 40, borderRadius: 10, background: i % 3 === 0 ? '#b21732' : '#e55e78', opacity: 0.2}} />)}</div>
			<div style={{position: 'absolute', top: 112, left: 290, width: 140, height: 66, borderRadius: 12, background: '#e55e78', transform: 'rotate(16deg)'}} />
			<div style={{position: 'absolute', top: 204, left: 420, width: 150, height: 62, borderRadius: 12, background: '#c62a46', transform: 'rotate(-20deg)'}} />
			<div style={{position: 'absolute', left: 110, bottom: 86, fontSize: 80}}>🔨</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="为了榨干昇腾的性能，工程师必须像拼极其苛刻的拼图一样，手动重排每一寸显存。" panel={<ComparisonPanel title="显存管理" topText="成熟的内存复用与动态分配" bottomText="需手动设计极致 Padding 与内存连续性" />} />;
};

const Sequence7: React.FC = () => {
	const frame = useCurrentFrame();
	const stream = ((frame * 14) % 1100) - 180;
	const top = (
		<>
			<div style={{position: 'absolute', left: 100, right: 100, top: 230, height: 28, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}}>
				<div style={{position: 'absolute', left: stream, top: -8, width: 180, height: 44, borderRadius: 999, background: 'linear-gradient(90deg, #d9ffbc, #76B900)', transform: `scaleX(${interpolate(frame % 80, [0, 79], [1.5, 0.7])})`, boxShadow: '0 0 18px rgba(118,185,0,0.45)'}} />
			</div>
			<div style={{position: 'absolute', top: 174, width: 110, height: 140, borderRadius: 20, border: '4px solid #d9ffbc', boxShadow: '0 0 20px rgba(118,185,0,0.35)'}} />
		</>
	);
	const bottom = (
		<>
			<div style={{position: 'absolute', left: 100, right: 100, top: 230, height: 28, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}}>
				<div style={{position: 'absolute', left: stream, top: -8, width: 180, height: 44, borderRadius: 999, background: 'linear-gradient(90deg, #ff8a9b, #C60020)', transform: `scaleX(${interpolate(frame % 80, [0, 79], [1.5, 0.7])})`, boxShadow: '0 0 18px rgba(198,0,32,0.45)'}} />
			</div>
			<div style={{position: 'absolute', top: 174, width: 110, height: 140, borderRadius: 20, border: '4px solid #ffd1d8'}} />
			{new Array(10).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 430 + random(i) * 180, top: 160 + random(i + 20) * 160, fontSize: 24, opacity: Math.sin((frame + i * 5) / 3) > 0 ? 1 : 0.2}}>✦</div>)}
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="为了极致省钱，模型必须采用极低的 FP8 精度。英伟达原生支持；昇腾则需要软件强行模拟。" panel={<ComparisonPanel title="FP8 低精度计算" topText="Transformer Engine 原生支持" bottomText="需软件层强行模拟与拦截截断误差" />} />;
};

const Sequence8: React.FC = () => {
	const frame = useCurrentFrame();
	const sway = Math.sin(frame / 12) * 18;
	const top = (
		<>
			<div style={{position: 'absolute', top: 164, width: 420, height: 5, background: '#d9ffbc'}} />
			<div style={{position: 'absolute', top: 224, width: 520, height: 120, borderRadius: 999, border: '4px dashed rgba(118,185,0,0.55)', boxShadow: '0 0 38px rgba(118,185,0,0.25) inset'}} />
			<div style={{position: 'absolute', top: 104, transform: `translateX(${sway}px)`, fontSize: 70}}>🧍</div>
		</>
	);
	const bottom = (
		<>
			<div style={{position: 'absolute', top: 162, width: 360, height: 4, background: '#ffd1d8', transform: `rotate(${sway * 0.8}deg)`}} />
			<div style={{position: 'absolute', bottom: 82, display: 'flex', gap: 18, fontSize: 44, fontWeight: 900, color: '#ff94a4'}}><span>NaN</span><span>异常</span></div>
			<div style={{position: 'absolute', top: 100, transform: `translateX(${sway * 1.9}px)`, fontSize: 70}}>🧍</div>
			<div style={{position: 'absolute', left: 120, bottom: 88, fontSize: 66}}>🧑‍💻🧯</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="没有原生安全网的保护，昇腾上的模型极易算术跑飞爆炸，步步惊心。" panel={<ComparisonPanel title="数值稳定性" topText="硬件级防溢出与动态缩放" bottomText="纯手工编写的防崩盘动态护栏机制" />} />;
};

const Sequence9: React.FC = () => {
	const top = (
		<>
			{new Array(8).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 150 + (i % 4) * 170, top: 120 + Math.floor(i / 4) * 120, width: 120, height: 80, borderRadius: 18, background: '#76B900', boxShadow: '0 0 18px rgba(118,185,0,0.35)'}} />)}
			{new Array(6).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 272 + (i % 3) * 170, top: 152 + Math.floor(i / 3) * 120, width: 48, height: 8, background: '#d8ffb9'}} />)}
		</>
	);
	const bottom = (
		<>
			{new Array(8).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 150 + (i % 4) * 170, top: 120 + Math.floor(i / 4) * 120, width: 120, height: 80, borderRadius: 18, background: '#C60020', boxShadow: '0 0 18px rgba(198,0,32,0.35)'}} />)}
			{new Array(5).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 272 + i * 120, top: 270, width: 44, height: 8, background: '#ffb0bd', transform: `rotate(${i % 2 === 0 ? 22 : -22}deg)`}} />)}
			<div style={{position: 'absolute', left: 120, bottom: 76, fontSize: 68}}>🧑‍🔧</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="单机八卡之内的数据穿梭，英伟达的 NVLink 是绝对王者，而华为自研的 HCCS 正在奋力追赶。" panel={<ComparisonPanel title="单节点互联技术" topText="NVLink & NVSwitch：地表最强节点内带宽" bottomText="华为自研 HCCS 高速互联" />} />;
};

const Sequence10: React.FC = () => {
	const frame = useCurrentFrame();
	const flow = ((frame * 18) % 1200) - 200;
	const top = (
		<>
			<div style={{position: 'absolute', top: 118, width: 420, height: 170, borderRadius: 30, background: 'linear-gradient(135deg, #17310d, #355d14)', border: '2px solid rgba(255,255,255,0.12)'}} />
			{new Array(4).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 80, right: 80, top: 150 + i * 44, height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}}><div style={{position: 'absolute', left: flow - i * 80, top: -4, width: 180, height: 18, borderRadius: 999, background: '#d8ffb9'}} /></div>)}
		</>
	);
	const bottom = (
		<>
			<div style={{position: 'absolute', top: 138, width: 760, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}} />
			<div style={{position: 'absolute', top: 176, width: 640, height: 110, borderTopLeftRadius: 60, borderTopRightRadius: 60, border: '8px solid rgba(255,180,190,0.8)', borderBottom: 'none'}} />
			{new Array(5).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 220 + i * 84, top: 124 + (i % 2) * 10, width: 88, height: 54, borderRadius: 16, background: i < 3 ? '#e0546d' : '#992034'}} />)}
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="万卡级别的互联，昇腾拥有极其暴力的物理带宽，却缺乏成熟的调度经验。" panel={<ComparisonPanel title="万卡集群网络" topText="InfiniBand 网络" bottomText="华为星河无损以太网（RoCE v2）" />} />;
};

const Sequence11: React.FC = () => {
	const frame = useCurrentFrame();
	const car = ((frame * 14) % 1000) - 80;
	const top = (
		<>
			<div style={{position: 'absolute', top: 170, width: 720, height: 18, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}} />
			<div style={{position: 'absolute', left: car, top: 156, width: 90, height: 46, borderRadius: 14, background: '#d8ffb9'}} />
			<div style={{position: 'absolute', top: 108, fontSize: 58}}>🚥</div>
		</>
	);
	const bottom = (
		<>
			<div style={{position: 'absolute', top: 170, width: 720, height: 18, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}} />
			{new Array(5).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 220 + i * 84, top: 154 + (i % 2) * 4, width: 90, height: 46, borderRadius: 14, background: '#e0546d'}} />)}
			<div style={{position: 'absolute', left: 130, top: 106, fontSize: 64}}>🧑‍💻</div>
			<div style={{position: 'absolute', left: 194, top: 118, fontSize: 52, transform: `rotate(${Math.sin(frame / 8) * 18}deg)`}}>🚦</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="DeepSeek 复杂的 MoE 模型需要疯狂调度数据，昇腾网络一旦拥堵，全靠顶尖大脑人工指挥交通。" panel={<ComparisonPanel title="通信与计算掩盖" topText="极度成熟的 NCCL 通信库" bottomText="需深度联合调优的 HCCL 调度策略" />} />;
};

const Sequence12: React.FC = () => {
	const frame = useCurrentFrame();
	const rewind = interpolate(Math.sin(frame / 14), [-1, 1], [0.2, 0.95]);
	const top = (
		<>
			<div style={{width: 280, height: 280, borderRadius: '50%', border: '12px solid rgba(118,185,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 34px rgba(118,185,0,0.25) inset'}}>
				<div style={{fontSize: 92}}>⏪</div>
			</div>
			<div style={{position: 'absolute', bottom: 110, width: 420, height: 16, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}}><div style={{width: `${rewind * 100}%`, height: '100%', borderRadius: 999, background: '#d8ffb9'}} /></div>
		</>
	);
	const bottom = (
		<>
			<div style={{width: 240, height: 280, borderRadius: 28, background: 'linear-gradient(135deg, #661021, #a81c35)', boxShadow: '0 0 34px rgba(198,0,32,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 40, fontWeight: 900}}>SAVE</div>
			<div style={{position: 'absolute', left: 150, bottom: 108, fontSize: 84, transform: `rotate(${Math.sin(frame / 12) * 20}deg)`}}>⚙️</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="训练就像玩游戏。在英伟达死机可以瞬间读档重来；在昇腾，你需要定制一整套全新的存档与灾难恢复机制。" panel={<ComparisonPanel title="Checkpoint 存储机制" topText="毫秒级异步断点保存与恢复" bottomText="需重新定制的大规模分布式容错保存方案" />} />;
};

const Sequence13: React.FC = () => {
	const frame = useCurrentFrame();
	const flash = frame % 50 < 16;
	const top = (
		<>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 16, width: 760}}>{new Array(24).fill(true).map((_, i) => <div key={i} style={{height: 42, borderRadius: 999, background: i === 6 && flash ? '#eaffd1' : '#76B900', boxShadow: i === 6 && flash ? '0 0 22px rgba(255,255,255,0.75)' : '0 0 10px rgba(118,185,0,0.35)'}} />)}</div>
			<div style={{position: 'absolute', left: 96, top: 92, fontSize: 72}}>🦾</div>
		</>
	);
	const bottom = (
		<>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 16, width: 760}}>{new Array(24).fill(true).map((_, i) => <div key={i} style={{height: 42, borderRadius: 999, background: i === 10 ? '#6b0d1a' : '#C60020', opacity: i === 10 ? 0.45 : 1}} />)}</div>
			<div style={{position: 'absolute', left: 88, top: 96, fontSize: 62}}>🧑‍⚕️🧑‍🔧</div>
			<div style={{position: 'absolute', left: 470, top: 116, fontSize: 48}}>💨</div>
		</>
	);
	return <SplitScene top={top} bottom={bottom} subtitle="万卡集群连跑几个月。英伟达有全自动的医疗舱；而昇腾，靠的是两家公司组成的抢险突击队日夜死守。" panel={<ComparisonPanel title="集群高可用性" topText="完善的坏卡自动隔离与替换" bottomText="AI 团队与算力厂商的保姆式贴身联合排障" />} />;
};

const Sequence14: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({fps, frame, config: {damping: 16, stiffness: 70}, durationInFrames: 84});
	const topHeight = interpolate(progress, [0, 1], [50, 0]);
	const topOpacity = interpolate(progress, [0, 0.85], [1, 0]);
	const bottomHeight = interpolate(progress, [0, 1], [50, 100]);
	return (
		<AbsoluteFill style={{backgroundColor: '#020102', fontFamily: font}}>
			<div style={{height: `${topHeight}%`, opacity: topOpacity, background: 'radial-gradient(circle at 50% 22%, rgba(118,185,0,0.28), #050905 60%)', borderBottom: topHeight > 0 ? `3px solid ${nvidia}` : 'none'}} />
			<div style={{height: `${bottomHeight}%`, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 12%, rgba(198,0,32,0.22), #090103 58%)'}}>
				{new Array(22).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: -200 + i * 64 + ((frame * (2 + i * 0.1)) % 120), top: 120 + i * 22, width: 220, height: 4, borderRadius: 999, background: i % 2 === 0 ? 'rgba(198,0,32,0.55)' : 'rgba(255,120,140,0.28)'}} />)}
				<div style={{width: 840, textAlign: 'center', color: 'white', fontSize: 36, lineHeight: 1.6, opacity: interpolate(frame, [110, 190], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>没有完美的生态，没有丝滑的工具，每推进一步，都要扒掉一层皮。这，就是用华为昇腾训练的真实写照。</div>
			</div>
		</AbsoluteFill>
	);
};

const Sequence15: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const core = spring({fps, frame: frame - 20, config: {damping: 12, stiffness: 120}});
	const glow = interpolate(Math.sin(frame / 8), [-1, 1], [0.6, 1]);
	return (
		<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 18%, rgba(198,0,32,0.32), #060102 62%)', color: 'white', fontFamily: font}}>
			<div style={{position: 'absolute', inset: 0, opacity: 0.26, backgroundImage: 'repeating-linear-gradient(90deg, #0d0d0f 0px, #0d0d0f 48px, #2a060c 48px, #2a060c 52px)', backgroundSize: '104px 100%'}} />
			<div style={{position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent, rgba(198,0,32,${0.12 + 0.08 * glow}) 50%, transparent)`}} />
			<div style={{position: 'absolute', top: 340, fontSize: 120, zIndex: 5}}>👐</div>
			<div style={{position: 'absolute', top: 430, width: 260, height: 260, borderRadius: 54, background: 'linear-gradient(135deg, #8d1429, #ff4d68)', boxShadow: `0 0 ${160 * glow}px rgba(255,68,102,0.95)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, fontWeight: 900, transform: `translateY(${interpolate(core, [0, 1], [120, 0])}px) scale(${interpolate(core, [0, 1], [0.72, 1])})`, opacity: core, zIndex: 10}}>DeepSeek</div>
			<div style={{position: 'absolute', top: 820, left: 90, right: 90, zIndex: 10}}><TypewriterQuote text="从来没有轻而易举的突围。" start={110} /></div>
			<div style={{position: 'absolute', left: 90, right: 90, bottom: 160, textAlign: 'center', fontSize: 29, lineHeight: 1.74, color: 'rgba(255,255,255,0.94)', opacity: interpolate(frame, [220, 360], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), zIndex: 10}}>它绝不是买来就能印钞的机器。它是无数中国工程师熬红的双眼，是几十万次死机后的咬牙硬挺。这条国产算力之路血迹斑斑。但这，就是中国 AI 抽筋拔骨、重塑自主脊梁，必须要蹚过的血路。</div>
		</AbsoluteFill>
	);
};

export const Storyboard15: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<Sequence durationInFrames={240} name="Sequence 1">
				<Sequence1 />
			</Sequence>
			<Sequence from={240} durationInFrames={240} name="Sequence 2">
				<Sequence2 />
			</Sequence>
			<Sequence from={480} durationInFrames={300} name="Sequence 3">
				<Sequence3 />
			</Sequence>
			<Sequence from={780} durationInFrames={300} name="Sequence 4">
				<Sequence4 />
			</Sequence>
			<Sequence from={1080} durationInFrames={300} name="Sequence 5">
				<Sequence5 />
			</Sequence>
			<Sequence from={1380} durationInFrames={300} name="Sequence 6">
				<Sequence6 />
			</Sequence>
			<Sequence from={1680} durationInFrames={300} name="Sequence 7">
				<Sequence7 />
			</Sequence>
			<Sequence from={1980} durationInFrames={300} name="Sequence 8">
				<Sequence8 />
			</Sequence>
			<Sequence from={2280} durationInFrames={300} name="Sequence 9">
				<Sequence9 />
			</Sequence>
			<Sequence from={2580} durationInFrames={300} name="Sequence 10">
				<Sequence10 />
			</Sequence>
			<Sequence from={2880} durationInFrames={300} name="Sequence 11">
				<Sequence11 />
			</Sequence>
			<Sequence from={3180} durationInFrames={300} name="Sequence 12">
				<Sequence12 />
			</Sequence>
			<Sequence from={3480} durationInFrames={300} name="Sequence 13">
				<Sequence13 />
			</Sequence>
			<Sequence from={3780} durationInFrames={420} name="Sequence 14">
				<Sequence14 />
			</Sequence>
			<Sequence from={4200} durationInFrames={600} name="Sequence 15">
				<Sequence15 />
			</Sequence>
		</AbsoluteFill>
	);
};
