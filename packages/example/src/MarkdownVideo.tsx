import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Sequence,
} from 'remotion';

/* ------------------------------------------------------------------ */
/*  Markdown Script Format                                            */
/*                                                                    */
/*  # Title of the video                                              */
/*  background: #fafafa                                               */
/*                                                                    */
/*  ## Scene 1: First Scene Name                                      */
/*  start: 0                                                          */
/*  duration: 180                                                     */
/*                                                                    */
/*  ### text                                                          */
/*  position: 540, 300                                                */
/*  animation: typewriter                                             */
/*  fontSize: 48                                                      */
/*  color: #333                                                       */
/*  content: This text will appear with typewriter effect              */
/*                                                                    */
/*  ### node                                                          */
/*  position: 540, 800                                                */
/*  animation: spring-pop                                             */
/*  label: Python Backend                                             */
/*  width: 220                                                        */
/*  height: 120                                                       */
/*                                                                    */
/*  ### arrow                                                         */
/*  from: 540, 800                                                    */
/*  to: 540, 400                                                      */
/*  animation: draw                                                   */
/*                                                                    */
/*  ### code                                                          */
/*  position: 540, 1200                                               */
/*  animation: fade-up                                                */
/*  content: sudo apt-get update                                      */
/*                                                                    */
/* ------------------------------------------------------------------ */

// ---- Types ----

interface TextElement {
	readonly type: 'text';
	readonly position: [number, number];
	readonly animation: string;
	readonly fontSize?: number;
	readonly color?: string;
	readonly fontWeight?: number;
	readonly textAlign?: string;
	readonly content: string;
}

interface NodeElement {
	readonly type: 'node';
	readonly position: [number, number];
	readonly animation: string;
	readonly label: string;
	readonly width?: number;
	readonly height?: number;
	readonly bgColor?: string;
	readonly borderColor?: string;
	readonly borderRadius?: number;
}

interface ArrowElement {
	readonly type: 'arrow';
	readonly from: [number, number];
	readonly to: [number, number];
	readonly animation: string;
	readonly color?: string;
	readonly strokeWidth?: number;
}

interface CodeElement {
	readonly type: 'code';
	readonly position: [number, number];
	readonly animation: string;
	readonly content: string;
	readonly fontSize?: number;
}

type ScriptElement = TextElement | NodeElement | ArrowElement | CodeElement;

interface Scene {
	readonly name: string;
	readonly start: number;
	readonly duration: number;
	readonly elements: ScriptElement[];
}

interface VideoScript {
	readonly title: string;
	readonly background: string;
	readonly scenes: Scene[];
}

// ---- Parser ----

const parsePosition = (val: string): [number, number] => {
	const parts = val.split(',').map((s) => Number.parseFloat(s.trim()));
	return [parts[0] ?? 0, parts[1] ?? 0];
};

const parseMarkdownScript = (md: string): VideoScript => {
	const lines = md.split('\n');
	let title = 'Untitled';
	let background = '#fafafa';
	const scenes: Scene[] = [];

	let currentScene: Scene | null = null;
	let currentElement: Partial<ScriptElement> | null = null;
	let currentContentLines: string[] = [];

	const flushElement = () => {
		if (!currentElement || !currentScene) return;
		if (currentContentLines.length > 0) {
			(currentElement as Record<string, unknown>).content =
				currentContentLines.join('\n');
			currentContentLines = [];
		}
		if (
			currentElement.type === 'text' ||
			currentElement.type === 'node' ||
			currentElement.type === 'arrow' ||
			currentElement.type === 'code'
		) {
			currentScene.elements.push(currentElement as ScriptElement);
		}
		currentElement = null;
	};

	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line) continue;

		// Title
		if (line.startsWith('# ') && !line.startsWith('## ')) {
			flushElement();
			title = line.slice(2).trim();
			continue;
		}

		// Metadata (background, etc.)
		if (line.startsWith('background:')) {
			background = line.slice('background:'.length).trim();
			continue;
		}

		// Scene heading
		if (line.startsWith('## ')) {
			flushElement();
			currentScene = {
				name: line.slice(3).trim(),
				start: 0,
				duration: 300,
				elements: [],
			};
			scenes.push(currentScene);
			continue;
		}

		// Scene metadata
		if (currentScene && line.startsWith('start:')) {
			currentScene = {
				...currentScene,
				start: Number.parseInt(line.slice('start:'.length).trim(), 10),
			};
			scenes[scenes.length - 1] = currentScene;
			continue;
		}
		if (currentScene && line.startsWith('duration:')) {
			currentScene = {
				...currentScene,
				duration: Number.parseInt(line.slice('duration:'.length).trim(), 10),
			};
			scenes[scenes.length - 1] = currentScene;
			continue;
		}

		// Element heading
		if (line.startsWith('### ')) {
			flushElement();
			const elType = line.slice(4).trim();
			currentElement = {type: elType} as Partial<ScriptElement>;
			continue;
		}

		// Element properties
		if (currentElement) {
			if (line.startsWith('position:')) {
				(currentElement as Record<string, unknown>).position = parsePosition(
					line.slice('position:'.length).trim(),
				);
			} else if (line.startsWith('from:')) {
				(currentElement as Record<string, unknown>).from = parsePosition(
					line.slice('from:'.length).trim(),
				);
			} else if (line.startsWith('to:')) {
				(currentElement as Record<string, unknown>).to = parsePosition(
					line.slice('to:'.length).trim(),
				);
			} else if (line.startsWith('animation:')) {
				(currentElement as Record<string, unknown>).animation = line
					.slice('animation:'.length)
					.trim();
			} else if (line.startsWith('fontSize:')) {
				(currentElement as Record<string, unknown>).fontSize = Number.parseInt(
					line.slice('fontSize:'.length).trim(),
					10,
				);
			} else if (line.startsWith('fontWeight:')) {
				(currentElement as Record<string, unknown>).fontWeight =
					Number.parseInt(line.slice('fontWeight:'.length).trim(), 10);
			} else if (line.startsWith('color:')) {
				(currentElement as Record<string, unknown>).color = line
					.slice('color:'.length)
					.trim();
			} else if (line.startsWith('textAlign:')) {
				(currentElement as Record<string, unknown>).textAlign = line
					.slice('textAlign:'.length)
					.trim();
			} else if (line.startsWith('label:')) {
				(currentElement as Record<string, unknown>).label = line
					.slice('label:'.length)
					.trim();
			} else if (line.startsWith('width:')) {
				(currentElement as Record<string, unknown>).width = Number.parseInt(
					line.slice('width:'.length).trim(),
					10,
				);
			} else if (line.startsWith('height:')) {
				(currentElement as Record<string, unknown>).height = Number.parseInt(
					line.slice('height:'.length).trim(),
					10,
				);
			} else if (line.startsWith('bgColor:')) {
				(currentElement as Record<string, unknown>).bgColor = line
					.slice('bgColor:'.length)
					.trim();
			} else if (line.startsWith('borderColor:')) {
				(currentElement as Record<string, unknown>).borderColor = line
					.slice('borderColor:'.length)
					.trim();
			} else if (line.startsWith('borderRadius:')) {
				(currentElement as Record<string, unknown>).borderRadius =
					Number.parseInt(line.slice('borderRadius:'.length).trim(), 10);
			} else if (line.startsWith('strokeWidth:')) {
				(currentElement as Record<string, unknown>).strokeWidth =
					Number.parseInt(line.slice('strokeWidth:'.length).trim(), 10);
			} else if (line.startsWith('content:')) {
				currentContentLines = [line.slice('content:'.length).trim()];
			} else if (line.startsWith('- ')) {
				// List item as content continuation
				currentContentLines.push(line.slice(2).trim());
			} else {
				// Continuation of content
				currentContentLines.push(line);
			}
		}
	}

	flushElement();

	return {title, background, scenes};
};

// ---- Animated Renderers ----

const TypewriterText: React.FC<{
	text: string;
	delay: number;
	speed?: number;
	style?: React.CSSProperties;
}> = ({text, delay, speed = 1.5, style}) => {
	const frame = useCurrentFrame();
	const charsToShow = Math.max(0, Math.floor((frame - delay) * speed));
	const displayText = text.slice(0, charsToShow);
	return (
		<div style={{...style, whiteSpace: 'pre-wrap'}}>
			{displayText}
			{charsToShow < text.length && charsToShow > 0 && (
				<span style={{opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0}}>▎</span>
			)}
		</div>
	);
};

const FadeUpText: React.FC<{
	text: string;
	delay: number;
	style?: React.CSSProperties;
}> = ({text, delay, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		fps,
		frame: Math.max(0, frame - delay),
		config: {damping: 14, stiffness: 100, mass: 0.8},
	});
	const opacity = interpolate(progress, [0, 1], [0, 1]);
	const translateY = interpolate(progress, [0, 1], [30, 0]);
	return (
		<div
			style={{
				...style,
				opacity,
				transform: `translateY(${translateY}px)`,
				whiteSpace: 'pre-wrap',
			}}
		>
			{text}
		</div>
	);
};

const SpringPopNode: React.FC<{
	delay: number;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}> = ({delay, style, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		fps,
		frame: Math.max(0, frame - delay),
		config: {damping: 12, stiffness: 120, mass: 0.7},
	});
	const scale = interpolate(progress, [0, 1], [0, 1]);
	const opacity = interpolate(progress, [0, 1], [0, 1]);
	return (
		<div
			style={{
				...style,
				transform: `translate(-50%, -50%) scale(${scale})`,
				opacity,
			}}
		>
			{children}
		</div>
	);
};

const DrawArrow: React.FC<{
	from: [number, number];
	to: [number, number];
	delay: number;
	color?: string;
	strokeWidth?: number;
}> = ({from, to, delay, color = '#333', strokeWidth = 3}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		fps,
		frame: Math.max(0, frame - delay),
		config: {damping: 16, stiffness: 80},
	});
	if (progress === 0) return null;
	const currentX = interpolate(progress, [0, 1], [from[0], to[0]]);
	const currentY = interpolate(progress, [0, 1], [from[1], to[1]]);
	const markerId = `arrow-${from[0]}-${from[1]}-${to[0]}-${to[1]}`;
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
			<defs>
				<marker
					id={markerId}
					markerWidth="10"
					markerHeight="7"
					refX="9"
					refY="3.5"
					orient="auto"
				>
					<polygon points="0 0, 10 3.5, 0 7" fill={color} />
				</marker>
			</defs>
			<line
				x1={from[0]}
				y1={from[1]}
				x2={currentX}
				y2={currentY}
				stroke={color}
				strokeWidth={strokeWidth}
				markerEnd={`url(#${markerId})`}
			/>
		</svg>
	);
};

// ---- Element Renderer ----

const RenderElement: React.FC<{element: ScriptElement}> = ({
	element,
}) => {
	const delay = 15; // default element entrance delay within scene

	switch (element.type) {
		case 'text': {
			const [x, y] = element.position;
			const anim = element.animation || 'typewriter';
			const baseStyle: React.CSSProperties = {
				position: 'absolute',
				left: x,
				top: y,
				transform: 'translate(-50%, -50%)',
				fontSize: element.fontSize || 36,
				color: element.color || '#333',
				fontWeight: element.fontWeight || 400,
				textAlign: (element.textAlign as React.CSSProperties['textAlign']) || 'center',
				fontFamily: 'system-ui, sans-serif',
				maxWidth: 900,
			};
			if (anim === 'typewriter') {
				return (
					<TypewriterText
						text={element.content}
						delay={delay}
						speed={1.8}
						style={baseStyle}
					/>
				);
			}
			// fade-up or default
			return (
				<FadeUpText text={element.content} delay={delay} style={baseStyle} />
			);
		}

		case 'node': {
			const [x, y] = element.position;
			return (
				<SpringPopNode
					delay={delay}
					style={{position: 'absolute', left: x, top: y}}
				>
					<div
						style={{
							width: element.width || 200,
							height: element.height || 100,
							backgroundColor: element.bgColor || '#e8e8e8',
							border: `3px solid ${element.borderColor || '#333'}`,
							borderRadius: element.borderRadius || 16,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 28,
							fontWeight: 600,
							color: '#333',
							fontFamily: 'system-ui, sans-serif',
							boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
						}}
					>
						{element.label}
					</div>
				</SpringPopNode>
			);
		}

		case 'arrow': {
			return (
				<DrawArrow
					from={element.from}
					to={element.to}
					delay={delay}
					color={element.color}
					strokeWidth={element.strokeWidth}
				/>
			);
		}

		case 'code': {
			const [x, y] = element.position;
			return (
				<FadeUpText
					text={element.content}
					delay={delay}
					style={{
						position: 'absolute',
						left: x,
						top: y,
						transform: 'translate(-50%, -50%)',
						backgroundColor: '#2f3434',
						color: '#f5f7f7',
						fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
						fontSize: element.fontSize || 26,
						padding: '18px 28px',
						borderRadius: 14,
						boxShadow: '0 8px 20px rgba(0,0,0,0.14)',
						whiteSpace: 'pre-wrap',
					}}
				/>
			);
		}

		default:
			return null;
	}
};

// ---- Main Component ----

export const MarkdownVideo: React.FC<{readonly script: string}> = ({
	script,
}) => {
	const parsed = React.useMemo(() => parseMarkdownScript(script), [script]);

	return (
		<AbsoluteFill style={{backgroundColor: parsed.background}}>
			{parsed.scenes.map((scene, i) => (
				<Sequence
					key={i}
					from={scene.start}
					durationInFrames={scene.duration}
				>
					{scene.elements.map((element, j) => (
						<RenderElement
							key={j}
							element={element}
						/>
					))}
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
