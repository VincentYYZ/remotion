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

const sectionStyle = (background: string, border: string): React.CSSProperties => ({
	flex: 1,
	position: 'relative',
	overflow: 'hidden',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background,
	borderColor: border,
	borderStyle: 'solid',
	borderWidth: 0,
});

const Subtitle: React.FC<{readonly text: string}> = ({text}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const enter = spring({fps, frame: frame - 10, config: {damping: 14, stiffness: 120}});
	return (
		<div
			style={{
				position: 'absolute',
				left: 60,
				right: 60,
				bottom: 42,
				padding: '22px 28px',
				borderRadius: 24,
				background: 'rgba(7,7,10,0.62)',
				backdropFilter: 'blur(18px)',
				border: '1px solid rgba(255,255,255,0.14)',
				color: 'white',
				fontSize: 30,
				lineHeight: 1.45,
				textAlign: 'center',
				fontFamily: 'Inter, system-ui, sans-serif',
				opacity: enter,
				transform: `translateY(${interpolate(enter, [0, 1], [20, 0])}px)`,
				zIndex: 40,
			}}
		>
			{text}
		</div>
	);
};

const TechPopup: React.FC<{
	readonly title: string;
	readonly desc: string;
	readonly color: string;
	readonly delay: number;
}> = ({title, desc, color, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const enter = spring({fps, frame: frame - delay, config: {damping: 12, stiffness: 150}});
	return (
		<div
			style={{
				width: 420,
				padding: '26px 28px',
				borderRadius: 28,
				border: `2px solid ${color}`,
				background: 'rgba(255,255,255,0.08)',
				backdropFilter: 'blur(20px)',
				boxShadow: `0 0 45px ${color}35`,
				color: 'white',
				fontFamily: 'Inter, system-ui, sans-serif',
				transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px) scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
				opacity: enter,
			}}
		>
			<div style={{fontSize: 34, fontWeight: 800, color, marginBottom: 14}}>{title}</div>
			<div style={{fontSize: 24, lineHeight: 1.5}}>{desc}</div>
		</div>
	);
};

const SceneLayout: React.FC<{
	readonly top: React.ReactNode;
	readonly bottom: React.ReactNode;
	readonly subtitle: string;
}> = ({top, bottom, subtitle}) => {
	return (
		<AbsoluteFill style={{backgroundColor: '#020202', fontFamily: 'Inter, system-ui, sans-serif'}}>
			<div style={{...sectionStyle('radial-gradient(circle at 50% 35%, rgba(118,185,0,0.24), #071004 65%)', nvidia), borderBottomWidth: 3}}>{top}</div>
			<div style={{...sectionStyle('radial-gradient(circle at 50% 35%, rgba(198,0,32,0.24), #120205 65%)', huawei), borderTopWidth: 3}}>{bottom}</div>
			<Subtitle text={subtitle} />
		</AbsoluteFill>
	);
};

const Sequence1: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const cut = spring({fps, frame, config: {damping: 14, stiffness: 120}});
	const card = spring({fps, frame: frame - 110, config: {damping: 13, stiffness: 90}});
	const logo = (delay: number, x: number) => {
		const p = spring({fps, frame: frame - delay, config: {damping: 12, stiffness: 140}});
		return {opacity: p, transform: `translateX(${interpolate(p, [0, 1], [x, 0])}px) scale(${interpolate(p, [0, 1], [0.7, 1])})`};
	};
	const top = (
		<>
			<div style={{position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent, rgba(118,185,0,${0.06 + 0.1 * Math.sin(frame / 18)}) 45%, transparent 80%)`, transform: `translateX(${(frame * 18) % 1600 - 400}px)`}} />
			<div style={{display: 'flex', gap: 18, position: 'absolute', top: 120}}>
				{['ChatGPT', 'Claude', 'Grok'].map((item, i) => (
					<div key={item} style={{...logo(12 + i * 16, i % 2 === 0 ? -180 : 180), padding: '16px 26px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 30, fontWeight: 700}}>{item}</div>
				))}
			</div>
			<div style={{opacity: card, transform: `scale(${interpolate(card, [0, 1], [0.85, 1.04])})`, padding: '44px 58px', borderRadius: 32, background: 'linear-gradient(135deg, #17260b, #76B900)', boxShadow: '0 0 80px rgba(118,185,0,0.5)', border: '2px solid rgba(255,255,255,0.18)', color: 'white', textAlign: 'center'}}>
				<div style={{fontSize: 64, fontWeight: 900}}>NVIDIA H100</div>
				<div style={{fontSize: 28, color: '#dbffb7', marginTop: 12}}>西方顶尖模型的舒适区</div>
			</div>
		</>
	);
	const bottom = (
		<>
			<div style={{opacity: card, transform: `scale(${interpolate(card, [0, 1], [0.88, 1.02])})`, padding: '42px 54px', borderRadius: 32, background: 'linear-gradient(135deg, #2b0710, #C60020)', boxShadow: '0 0 70px rgba(198,0,32,0.42)', border: '2px solid rgba(255,255,255,0.14)', color: 'white', textAlign: 'center'}}>
				<div style={{fontSize: 58, fontWeight: 900}}>华为昇腾 910B/C</div>
				<div style={{fontSize: 28, color: '#ffc1ca', marginTop: 12}}>DeepSeek 选择的艰难之路</div>
			</div>
			<div style={{position: 'absolute', top: 110, opacity: logo(70, 0).opacity, transform: logo(70, 0).transform, padding: '18px 28px', borderRadius: 999, background: 'rgba(77,114,249,0.18)', border: '2px solid #4d72f9', color: 'white', fontSize: 32, fontWeight: 800}}>DeepSeek</div>
		</>
	);
	return <AbsoluteFill><SceneLayout top={top} bottom={bottom} subtitle="当 ChatGPT、Claude、Grok 都在英伟达构建的舒适区里狂飙时，DeepSeek 却选择了华为昇腾这条极难的泥泞之路。" /><div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 6, background: '#000', transform: `scaleX(${interpolate(cut, [0, 1], [1, 0])})`, transformOrigin: 'center'}} /></AbsoluteFill>;
};

const Sequence2: React.FC = () => {
	const frame = useCurrentFrame();
	const top = (
		<>
			<div style={{position: 'absolute', width: 260, height: 260, borderRadius: '50%', border: '26px solid rgba(118,185,0,0.15)', transform: `rotate(${frame * 3}deg)`}} />
			<div style={{position: 'absolute', width: 430, height: 12, background: 'linear-gradient(90deg, transparent, rgba(118,185,0,0.95), transparent)', transform: `translateX(${(frame * 22) % 1000 - 500}px)`}} />
			<div style={{position: 'absolute', left: 80, bottom: 90, fontSize: 24, color: '#d7ffba'}}>自动齿轮 / 光流 / 开箱即用</div>
			<div style={{position: 'absolute', right: 70, top: 110}}><TechPopup title="CUDA 生态" desc="极度成熟的底层算子库，海量开源代码开箱即用，研发如履平地。" color={nvidia} delay={90} /></div>
		</>
	);
	const bottom = (
		<>
			{new Array(8).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 100 + i * 90, top: 120 + (i % 2) * 70, width: 68, height: 18, background: i % 3 === 0 ? '#2d2d2d' : '#8d1a2b', opacity: 0.9, transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)`}} />)}
			{new Array(18).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 140 + random(i) * 820, top: 140 + random(i + 10) * 240, width: 6, height: 6, borderRadius: '50%', background: '#ffd166', boxShadow: '0 0 12px #ffd166', opacity: Math.sin((frame + i * 7) / 5) > 0 ? 1 : 0.2}} />)}
			<div style={{position: 'absolute', left: 120, bottom: 78, fontSize: 68}}>🧑‍🏭 🧑‍🏭</div>
			<div style={{position: 'absolute', right: 70, top: 110}}><TechPopup title="CANN / Ascend C 架构" desc="生态荒原。复杂核心算子无法直接移植，只能由顶尖工程师逐行推翻重写。" color={huawei} delay={120} /></div>
		</>
	);
	return <SceneLayout top={top} bottom={bottom} subtitle="英伟达拥有开箱即用的神级生态；而在昇腾上，一切底层魔法，都必须抽筋拔骨、推翻重写。" />;
};

const Sequence3: React.FC = () => {
	const frame = useCurrentFrame();
	const packetX = (speed: number, offset: number) => ((frame * speed + offset) % 1400) - 250;
	const top = (
		<>
			{[150, 235, 320].map((y, i) => <div key={y} style={{position: 'absolute', left: 90, right: 90, top: y, height: 24, borderRadius: 999, background: 'rgba(255,255,255,0.06)'}}><div style={{position: 'absolute', left: packetX(16 + i * 2, i * 220), top: -6, width: 120, height: 36, borderRadius: 999, background: 'linear-gradient(90deg, #b0ff66, #76B900)', boxShadow: '0 0 24px rgba(118,185,0,0.6)'}} /></div>)}
			<div style={{position: 'absolute', right: 70, top: 110}}><TechPopup title="NVLink + NCCL 调度" desc="完美的软硬协同通信。极高互联带宽与极低延迟路由，让数据穿梭几乎零卡顿。" color={nvidia} delay={90} /></div>
		</>
	);
	const bottom = (
		<>
			<div style={{position: 'absolute', left: 70, right: 70, top: 230, height: 84, borderRadius: 999, background: 'rgba(255,255,255,0.07)'}} />
			{new Array(7).fill(true).map((_, i) => <div key={i} style={{position: 'absolute', left: 180 + i * 90 - (i > 3 ? 40 : 0), top: 244 + (i % 2) * 6, width: 110, height: 56, borderRadius: 18, background: i < 5 ? '#d93851' : '#a10a24', boxShadow: i < 5 ? '0 0 14px rgba(198,0,32,0.35)' : undefined}} />)}
			<div style={{position: 'absolute', left: 120, bottom: 76, fontSize: 74}}>🚦🧑‍💻</div>
			<div style={{position: 'absolute', right: 70, top: 110}}><TechPopup title="星河无损以太网 + HCCL" desc="物理运力巨大，但缺乏深度调优经验，通信极易拥堵，只能人工彻夜打磨流水线。" color={huawei} delay={120} /></div>
		</>
	);
	return <SceneLayout top={top} bottom={bottom} subtitle="面对海量数据的跨卡狂奔，英伟达像全自动智能立交桥；而华为昇腾网络虽强，却需要算法团队像交警一样手动疏导。" />;
};

const Sequence4: React.FC = () => {
	const frame = useCurrentFrame();
	const sway = Math.sin(frame / 16) * 18;
	const top = (
		<>
			<div style={{position: 'absolute', top: 170, width: 420, height: 6, background: '#d7f7b8'}} />
			<div style={{position: 'absolute', top: 240, width: 520, height: 110, borderRadius: 999, border: '4px dashed rgba(118,185,0,0.6)', boxShadow: '0 0 40px rgba(118,185,0,0.3) inset'}} />
			<div style={{position: 'absolute', top: 118, transform: `translateX(${sway}px)` as string, fontSize: 72}}>🤖</div>
			<div style={{position: 'absolute', right: 70, top: 110}}><TechPopup title="原生 FP8 引擎" desc="硬件级低精度支持。动态拦截计算溢出，兼顾极致速度与模型不崩盘。" color={nvidia} delay={90} /></div>
		</>
	);
	const bottom = (
		<>
			<div style={{position: 'absolute', top: 166, width: 360, height: 4, background: '#ffd1d8', transform: `rotate(${sway * 0.5}deg)`}} />
			<div style={{position: 'absolute', bottom: 90, display: 'flex', gap: 20, color: '#ff8798', fontSize: 46, fontWeight: 800}}><span>NaN</span><span>Loss 爆炸</span></div>
			<div style={{position: 'absolute', top: 108, transform: `translateX(${sway * 1.7}px)` as string, fontSize: 72}}>🧍</div>
			<div style={{position: 'absolute', left: 92, bottom: 80, fontSize: 70}}>🧑‍💻🧯</div>
			<div style={{position: 'absolute', right: 70, top: 110}}><TechPopup title="软件级模拟 FP8" desc="缺乏原生安全网。极易出现算数跑飞，只能强行研发动态防爆代码，步步惊心。" color={huawei} delay={120} /></div>
		</>
	);
	return <SceneLayout top={top} bottom={bottom} subtitle="挑战极限低精度，英伟达自带防爆安全网；而昇腾只能靠算法天才强行摸索，稍有不慎模型就会崩盘。" />;
};

const Sequence5: React.FC = () => {
	const frame = useCurrentFrame();
	const flash = frame % 48 < 18;
	const top = (
		<>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 18, width: 760}}>{new Array(24).fill(true).map((_, i) => <div key={i} style={{height: 42, borderRadius: 999, background: i === 7 && flash ? '#dfffb9' : '#76B900', boxShadow: i === 7 && flash ? '0 0 26px rgba(255,255,255,0.8)' : '0 0 12px rgba(118,185,0,0.4)'}} />)}</div>
			<div style={{position: 'absolute', left: 90, top: 90, fontSize: 70}}>🦾</div>
			<div style={{position: 'absolute', right: 70, top: 110}}><TechPopup title="高 MTBF 集群容错" desc="极高的平均无故障时间，加上成熟的自动定位与毫秒级断点恢复，让大规模训练近乎流水线化。" color={nvidia} delay={90} /></div>
		</>
	);
	const bottom = (
		<>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 18, width: 760}}>{new Array(24).fill(true).map((_, i) => <div key={i} style={{height: 42, borderRadius: 999, background: i === 9 ? '#6b0a19' : '#C60020', opacity: i === 9 ? 0.45 : 1}} />)}</div>
			<div style={{position: 'absolute', left: 90, top: 88, fontSize: 66}}>🧑‍🔧 🧑‍💻</div>
			<div style={{position: 'absolute', top: 118, left: 520, fontSize: 52}}>💨</div>
			<div style={{position: 'absolute', right: 70, top: 110}}><TechPopup title="保姆式联合排障" desc="缺乏长期万卡训练沉淀，需要 DeepSeek 与 Huawei 顶尖专家组成突击队，24 小时贴身应对死机风险。" color={huawei} delay={120} /></div>
		</>
	);
	return <SceneLayout top={top} bottom={bottom} subtitle="万卡马拉松连跑几个月。在英伟达那里像自动流水线，在华为这边却是工程师 24 小时贴身守护的保卫战。" />;
};

const Sequence6: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const collapse = spring({fps, frame, config: {damping: 15, stiffness: 70}, durationInFrames: 90});
	const topHeight = interpolate(collapse, [0, 1], [50, 0]);
	const bottomHeight = interpolate(collapse, [0, 1], [50, 100]);
	const core = spring({fps, frame: frame - 90, config: {damping: 12, stiffness: 120}});
	const glow = interpolate(Math.sin(frame / 8), [-1, 1], [0.6, 1]);
	const line = '从来没有轻而易举的突围';
	return (
		<AbsoluteFill style={{backgroundColor: '#020102', color: 'white', fontFamily: 'Inter, system-ui, sans-serif'}}>
			<div style={{height: `${topHeight}%`, opacity: interpolate(collapse, [0, 0.8], [1, 0]), background: 'radial-gradient(circle at 50% 20%, rgba(118,185,0,0.3), #050905 60%)', borderBottom: topHeight > 0 ? '3px solid #76B900' : 'none'}} />
			<div style={{height: `${bottomHeight}%`, position: 'relative', background: 'radial-gradient(circle at 50% 15%, rgba(198,0,32,0.28), #070103 58%)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
				<div style={{position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'repeating-linear-gradient(90deg, #0d0d0f 0px, #0d0d0f 54px, #26060c 54px, #26060c 58px)', backgroundSize: '120px 100%'}} />
				<div style={{position: 'absolute', top: 280, fontSize: 110}}>👐</div>
				<div style={{width: 240, height: 240, borderRadius: 46, background: 'linear-gradient(135deg, #3158ff, #88a0ff)', boxShadow: `0 0 ${130 * glow}px rgba(77,114,249,0.95)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 900, transform: `translateY(${interpolate(core, [0, 1], [140, 0])}px) scale(${interpolate(core, [0, 1], [0.72, 1])})`, opacity: core, zIndex: 10}}>DeepSeek</div>
				<div style={{display: 'flex', gap: 6, marginTop: 96, zIndex: 10}}>{line.split('').map((char, i) => { const p = spring({fps, frame: frame - 190 - i * 5, config: {damping: 12, stiffness: 200}}); return <span key={char + i} style={{fontSize: 76, fontWeight: 900, color: '#fff', textShadow: '0 0 22px rgba(198,0,32,0.65)', opacity: p, transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)`}}>{char}</span>; })}</div>
				<div style={{marginTop: 40, width: 860, textAlign: 'center', fontSize: 28, lineHeight: 1.7, color: 'rgba(255,255,255,0.92)', zIndex: 10, opacity: interpolate(frame, [260, 360], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>看到这里你就会明白，用华为昇腾训练出震惊世界的 DeepSeek，究竟有多么震撼。它不是插上电就能印钞的机器，而是无数工程师熬红双眼、推翻重来的代码、以及几百个日夜扛住绝望后的破局。</div>
			</div>
		</AbsoluteFill>
	);
};

export const Storyboard: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<Sequence durationInFrames={300}><Sequence1 /></Sequence>
			<Sequence from={300} durationInFrames={600}><Sequence2 /></Sequence>
			<Sequence from={900} durationInFrames={600}><Sequence3 /></Sequence>
			<Sequence from={1500} durationInFrames={600}><Sequence4 /></Sequence>
			<Sequence from={2100} durationInFrames={600}><Sequence5 /></Sequence>
			<Sequence from={2700} durationInFrames={900}><Sequence6 /></Sequence>
		</AbsoluteFill>
	);
};
