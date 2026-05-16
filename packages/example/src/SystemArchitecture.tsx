import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Sequence,
} from 'remotion';

const TypewriterText: React.FC<{
	text: string;
	delay: number;
	speed?: number;
	style?: React.CSSProperties;
}> = ({text, delay, speed = 1.5, style}) => {
	const frame = useCurrentFrame();
	const charsToShow = Math.max(0, Math.floor((frame - delay) * speed));
	const lines = text.split('\n');

	let charCount = 0;
	return (
		<div style={{...style, display: 'flex', flexDirection: 'column'}}>
			{lines.map((line, index) => {
				const startChar = charCount;
				charCount += line.length;
				if (charsToShow <= startChar) return null;
				const displayLine = line.slice(0, Math.max(0, charsToShow - startChar));
				return (
					<span key={index} style={{minHeight: '1.2em'}}>
						{displayLine}
					</span>
				);
			})}
		</div>
	);
};

const AnimatedNode: React.FC<{
	delay: number;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({delay, children, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame: Math.max(0, frame - delay),
		config: {damping: 12, stiffness: 100, mass: 0.8},
	});

	const scale = interpolate(progress, [0, 1], [0, 1]);
	const opacity = interpolate(progress, [0, 1], [0, 1]);

	return (
		<div
			style={{
				position: 'absolute',
				transform: `translate(-50%, -50%) scale(${scale})`,
				opacity,
				...style,
			}}
		>
			{children}
		</div>
	);
};

const AnimatedArrow: React.FC<{
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	delay: number;
	color?: string;
	strokeWidth?: number;
}> = ({startX, startY, endX, endY, delay, color = '#333', strokeWidth = 3}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame: Math.max(0, frame - delay),
		config: {damping: 14, stiffness: 80},
	});

	if (progress === 0) return null;

	const currentX = interpolate(progress, [0, 1], [startX, endX]);
	const currentY = interpolate(progress, [0, 1], [startY, endY]);

	const dx = endX - startX;
	const dy = endY - startY;

	return (
		<svg
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: 0,
			}}
		>
			<line
				x1={startX}
				y1={startY}
				x2={currentX}
				y2={currentY}
				stroke={color}
				strokeWidth={strokeWidth}
				markerEnd={`url(#arrowhead-${startX}-${startY})`}
			/>
			<defs>
				<marker
					id={`arrowhead-${startX}-${startY}`}
					markerWidth="10"
					markerHeight="7"
					refX="9"
					refY="3.5"
					orient="auto"
				>
					<polygon points="0 0, 10 3.5, 0 7" fill={color} />
				</marker>
			</defs>
		</svg>
	);
};

export const SystemArchitecture: React.FC = () => {
	// 60 fps timing
	// Python backend: 30
	// FastAPI text: 60
	// SQLite: 180
	// AI nodes: 300
	// YOLO arrows: 420
	// Backend process text: 480
	// Frontend arrow: 660
	// Frontend dashboard: 720
	// Frontend texts: 840

	const textStyle: React.CSSProperties = {
		fontFamily: 'system-ui, sans-serif',
		fontSize: 22,
		color: '#333',
		lineHeight: 1.6,
		whiteSpace: 'pre-wrap',
	};

	return (
		<AbsoluteFill style={{backgroundColor: '#fafafa'}}>
			{/* Arrows */}
			{/* SQLite to Python */}
			<AnimatedArrow
				startX={540}
				startY={1650}
				endX={540}
				endY={1250}
				delay={200}
			/>

			{/* Python to Frontend */}
			<AnimatedArrow
				startX={540}
				startY={1000}
				endX={540}
				endY={450}
				delay={660}
			/>

			{/* YOLO to Python (Bottom to Top-ish) */}
			<AnimatedArrow
				startX={320}
				startY={1080}
				endX={430}
				endY={1080}
				delay={420}
			/>
			{/* Python to YOLO (Top to Bottom-ish) */}
			<AnimatedArrow
				startX={430}
				startY={1120}
				endX={320}
				endY={1120}
				delay={440}
			/>

			{/* Texts */}
			<div style={{position: 'absolute', top: 150, left: 50, width: 400}}>
				<TypewriterText
					delay={840}
					speed={2.0}
					style={textStyle}
					text={`前端大致流程如下：\n- 用户登录或注册。\n- 登录成功后保存 token。\n- 建立 \`ws://localhost:8000/ws/stream?...\` 连接。\n- 持续接收后端推送的数据。\n- 更新画面和图表。`}
				/>
			</div>

			<div style={{position: 'absolute', top: 150, left: 800, width: 250}}>
				<TypewriterText
					delay={940}
					speed={2.0}
					style={textStyle}
					text={`前端主要使用以下技术：\n- Vue 3\n- Vite\n- Element Plus\n- ECharts\n- 视频画面。\n- 统计卡片。\n- 折线图。\n- 饼图等可视化组件。`}
				/>
			</div>

			<div style={{position: 'absolute', top: 700, left: 750, width: 300}}>
				<TypewriterText
					delay={60}
					speed={2.0}
					style={textStyle}
					text={`FastAPI：提供 HTTP API 和 WebSocket 服务\n- 当前处理后的视频帧。\n- 当前统计信息。\n- 动态目标详情。\n- 静态目标详情。\n- 道路信息。`}
				/>
			</div>

			<div style={{position: 'absolute', top: 1100, left: 750, width: 300}}>
				<TypewriterText
					delay={480}
					speed={2.0}
					style={textStyle}
					text={`后端大致流程如下：\n- 启动 FastAPI。\n- 初始化数据库。\n- 加载 YOLO 模型。\n- 读取视频流。\n- 对每一帧做检测、跟踪、分割。\n- 生成统计数据。\n- 编码图像并通过 WebSocket 推送给前端。`}
				/>
			</div>

			<div style={{position: 'absolute', top: 1180, left: 150, width: 200}}>
				<TypewriterText
					delay={330}
					speed={1.5}
					style={{...textStyle, fontSize: 18, textAlign: 'center'}}
					text={`负责目标检测、跟踪和分割`}
				/>
			</div>

			<div style={{position: 'absolute', top: 1560, left: 150, width: 200}}>
				<TypewriterText
					delay={360}
					speed={1.5}
					style={{...textStyle, fontSize: 18, textAlign: 'center'}}
					text={`负责视频读取、图像处理和可视化绘制`}
				/>
			</div>

			<div style={{position: 'absolute', top: 1800, left: 340, width: 400}}>
				<TypewriterText
					delay={220}
					speed={1.5}
					style={{...textStyle, fontSize: 18, textAlign: 'center'}}
					text={`保存用户信息、静态要素记录、道路分割记录`}
				/>
			</div>

			{/* Nodes */}
			{/* Python Backend */}
			<AnimatedNode delay={30} style={{top: 1100, left: 540}}>
				<div
					style={{
						width: 220,
						height: 120,
						backgroundColor: '#e0e0e0',
						borderRadius: 20,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						border: '3px solid #333',
						boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
					}}
				>
					<div style={{display: 'flex', gap: 10, marginBottom: 10}}>
						<div
							style={{
								width: 40,
								height: 15,
								backgroundColor: '#b0b0b0',
								borderRadius: 4,
							}}
						/>
						<div
							style={{
								width: 40,
								height: 15,
								backgroundColor: '#b0b0b0',
								borderRadius: 4,
							}}
						/>
					</div>
					<div style={{fontSize: 28, fontWeight: 'bold', color: '#333'}}>
						python后端
					</div>
				</div>
			</AnimatedNode>

			{/* SQLite */}
			<AnimatedNode delay={180} style={{top: 1720, left: 540}}>
				<div
					style={{
						width: 100,
						height: 120,
						backgroundColor: '#e0e0e0',
						borderRadius: 10,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						border: '3px solid #333',
						boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: -10,
							width: 100,
							height: 20,
							backgroundColor: '#e0e0e0',
							borderRadius: '50%',
							border: '3px solid #333',
						}}
					/>
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
							alignItems: 'center',
						}}
					>
						<div
							style={{
								width: 15,
								height: 15,
								borderRadius: '50%',
								backgroundColor: '#333',
							}}
						/>
						<div
							style={{
								width: 15,
								height: 15,
								borderRadius: '50%',
								backgroundColor: '#333',
							}}
						/>
						<div
							style={{
								width: 15,
								height: 15,
								borderRadius: '50%',
								backgroundColor: '#333',
							}}
						/>
					</div>
					<div
						style={{
							position: 'absolute',
							bottom: -10,
							width: 100,
							height: 20,
							backgroundColor: '#e0e0e0',
							borderRadius: '50%',
							borderBottom: '3px solid #333',
							borderLeft: '3px solid #333',
							borderRight: '3px solid #333',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							bottom: -40,
							fontSize: 24,
							fontWeight: 'bold',
							color: '#333',
						}}
					>
						SQLite
					</div>
				</div>
			</AnimatedNode>

			{/* YOLOv8 */}
			<AnimatedNode delay={300} style={{top: 1080, left: 250}}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div style={{position: 'relative', width: 100, height: 60}}>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: 100,
								height: 20,
								backgroundColor: '#ff6b6b',
								border: '2px solid #333',
								transform: 'skewX(-20deg)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 15,
								left: 0,
								width: 100,
								height: 20,
								backgroundColor: '#ff6b6b',
								border: '2px solid #333',
								transform: 'skewX(-20deg)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 30,
								left: 0,
								width: 100,
								height: 20,
								backgroundColor: '#ff6b6b',
								border: '2px solid #333',
								transform: 'skewX(-20deg)',
							}}
						/>
					</div>
					<div
						style={{
							fontSize: 24,
							fontWeight: 'bold',
							color: '#333',
							marginTop: 10,
						}}
					>
						yolov8
					</div>
				</div>
			</AnimatedNode>

			{/* Video File */}
			<AnimatedNode delay={310} style={{top: 1320, left: 250}}>
				<div
					style={{
						padding: '10px 20px',
						backgroundColor: '#fff',
						borderRadius: 10,
						border: '3px solid #333',
						fontSize: 22,
						fontWeight: 'bold',
						color: '#333',
					}}
				>
					视频文件
				</div>
			</AnimatedNode>

			{/* OpenCV */}
			<AnimatedNode delay={320} style={{top: 1480, left: 250}}>
				<div
					style={{
						padding: '10px 20px',
						backgroundColor: '#fff',
						borderRadius: 20,
						border: '3px solid #333',
						fontSize: 22,
						fontWeight: 'bold',
						color: '#333',
					}}
				>
					openCV
				</div>
			</AnimatedNode>

			{/* Frontend Dashboard Dummy */}
			<AnimatedNode delay={720} style={{top: 300, left: 540}}>
				<div
					style={{
						width: 500,
						height: 320,
						backgroundColor: '#fff',
						borderRadius: 10,
						border: '3px solid #333',
						boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
						display: 'flex',
						flexDirection: 'column',
						overflow: 'hidden',
					}}
				>
					{/* Header */}
					<div
						style={{
							height: 40,
							backgroundColor: '#5c6bc0',
							display: 'flex',
							alignItems: 'center',
							padding: '0 15px',
						}}
					>
						<div style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
							道路场景静态与动态要素识别系统
						</div>
					</div>
					{/* Body */}
					<div style={{display: 'flex', flex: 1, padding: 10, gap: 10}}>
						{/* Left: Video */}
						<div
							style={{
								flex: 2,
								backgroundColor: '#f0f0f0',
								borderRadius: 5,
								border: '1px solid #ddd',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div style={{color: '#999'}}>Video Feed</div>
						</div>
						{/* Right: Charts */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: 10,
							}}
						>
							<div
								style={{
									flex: 1,
									backgroundColor: '#f0f0f0',
									borderRadius: 5,
									border: '1px solid #ddd',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										width: 40,
										height: 40,
										borderRadius: '50%',
										border: '4px solid #4caf50',
										borderTopColor: 'transparent',
									}}
								/>
							</div>
							<div
								style={{
									flex: 1,
									backgroundColor: '#f0f0f0',
									borderRadius: 5,
									border: '1px solid #ddd',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										width: 40,
										height: 40,
										borderRadius: '50%',
										border: '4px solid #f44336',
										borderRightColor: 'transparent',
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</AnimatedNode>
		</AbsoluteFill>
	);
};
