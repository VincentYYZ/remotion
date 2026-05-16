import React, {useMemo} from 'react';
import {
	AbsoluteFill,
	Composition,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

// ──────────────────────────────────────────
//  Token 颜色配置 (VS Code Dark+)
// ──────────────────────────────────────────
const TOKEN_COLORS: Record<string, string> = {
	keyword: '#c586c0', // import, const, return, export
	function: '#dcdcaa', // React, useState, registerRoot
	type: '#4ec9b0', // React.FC, string
	string: '#ce9178', // "hello"
	comment: '#6a9955', // //
	number: '#b5cea8', // 30, 1920
	operator: '#d4d4d4', // =, :, {, }, (, )
	tag: '#569cd6', // <div>
	attr: '#9cdcfe', // style, id
	plain: '#d4d4d4', // 普通文字
	tagBracket: '#808080', // < > / >
};

// ──────────────────────────────────────────
//  代码内容（每行预先 tokenize）
// ──────────────────────────────────────────
type Token = {text: string; color: string};

const codeLines: Token[][] = [
	[
		{text: 'import', color: TOKEN_COLORS.keyword},
		{text: ' ', color: TOKEN_COLORS.plain},
		{text: 'React', color: TOKEN_COLORS.type},
		{text: ', { ', color: TOKEN_COLORS.operator},
		{text: 'useState', color: TOKEN_COLORS.function},
		{text: ' } ', color: TOKEN_COLORS.operator},
		{text: 'from', color: TOKEN_COLORS.keyword},
		{text: ' ', color: TOKEN_COLORS.plain},
		{text: '"react"', color: TOKEN_COLORS.string},
		{text: ';', color: TOKEN_COLORS.operator},
	],
	[],
	[
		{text: 'export', color: TOKEN_COLORS.keyword},
		{text: ' ', color: TOKEN_COLORS.plain},
		{text: 'const', color: TOKEN_COLORS.keyword},
		{text: ' ', color: TOKEN_COLORS.plain},
		{text: 'Counter', color: TOKEN_COLORS.function},
		{text: ': ', color: TOKEN_COLORS.operator},
		{text: 'React.FC', color: TOKEN_COLORS.type},
		{text: ' = () => {', color: TOKEN_COLORS.operator},
	],
	[
		{text: '  ', color: TOKEN_COLORS.plain},
		{text: 'const', color: TOKEN_COLORS.keyword},
		{text: ' [', color: TOKEN_COLORS.operator},
		{text: 'count', color: TOKEN_COLORS.attr},
		{text: ', ', color: TOKEN_COLORS.plain},
		{text: 'setCount', color: TOKEN_COLORS.function},
		{text: '] = ', color: TOKEN_COLORS.operator},
		{text: 'useState', color: TOKEN_COLORS.function},
		{text: '(', color: TOKEN_COLORS.operator},
		{text: '0', color: TOKEN_COLORS.number},
		{text: ');', color: TOKEN_COLORS.operator},
	],
	[],
	[
		{text: '  ', color: TOKEN_COLORS.plain},
		{text: 'return', color: TOKEN_COLORS.keyword},
		{text: ' (', color: TOKEN_COLORS.operator},
	],
	[
		{text: '    ', color: TOKEN_COLORS.plain},
		{text: '<', color: TOKEN_COLORS.tagBracket},
		{text: 'div', color: TOKEN_COLORS.tag},
		{text: ' ', color: TOKEN_COLORS.plain},
		{text: 'className', color: TOKEN_COLORS.attr},
		{text: '=', color: TOKEN_COLORS.operator},
		{text: '"counter"', color: TOKEN_COLORS.string},
		{text: '>', color: TOKEN_COLORS.tagBracket},
	],
	[
		{text: '      ', color: TOKEN_COLORS.plain},
		{text: '<', color: TOKEN_COLORS.tagBracket},
		{text: 'h1', color: TOKEN_COLORS.tag},
		{text: '>', color: TOKEN_COLORS.tagBracket},
		{text: 'Count: ', color: TOKEN_COLORS.plain},
		{text: '{count}', color: TOKEN_COLORS.attr},
		{text: '</', color: TOKEN_COLORS.tagBracket},
		{text: 'h1', color: TOKEN_COLORS.tag},
		{text: '>', color: TOKEN_COLORS.tagBracket},
	],
	[
		{text: '      ', color: TOKEN_COLORS.plain},
		{text: '<', color: TOKEN_COLORS.tagBracket},
		{text: 'button', color: TOKEN_COLORS.tag},
		{text: ' ', color: TOKEN_COLORS.plain},
		{text: 'onClick', color: TOKEN_COLORS.attr},
		{text: '={() => ', color: TOKEN_COLORS.operator},
		{text: 'setCount', color: TOKEN_COLORS.function},
		{text: '(c => c + ', color: TOKEN_COLORS.operator},
		{text: '1', color: TOKEN_COLORS.number},
		{text: ')}', color: TOKEN_COLORS.operator},
		{text: '>', color: TOKEN_COLORS.tagBracket},
		{text: '+', color: TOKEN_COLORS.plain},
		{text: '</', color: TOKEN_COLORS.tagBracket},
		{text: 'button', color: TOKEN_COLORS.tag},
		{text: '>', color: TOKEN_COLORS.tagBracket},
	],
	[
		{text: '    ', color: TOKEN_COLORS.plain},
		{text: '</', color: TOKEN_COLORS.tagBracket},
		{text: 'div', color: TOKEN_COLORS.tag},
		{text: '>', color: TOKEN_COLORS.tagBracket},
	],
	[{text: '  );', color: TOKEN_COLORS.operator}],
	[{text: '};', color: TOKEN_COLORS.operator}],
];

const finalCursorLine = 12;

// ──────────────────────────────────────────
//  组件
// ──────────────────────────────────────────
const VSCodeCodingScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// 总打字时间线：从 frame 20 开始，逐字符打字
	const typeStartFrame = 20;
	const charsPerSecond = 18;
	const charsPerFrame = charsPerSecond / fps;

	// 计算当前已经打出的总字符数
	const totalTypedChars = Math.max(
		0,
		Math.floor((frame - typeStartFrame) * charsPerFrame),
	);

	// 逐字符构建已显示内容
	let remainingChars = totalTypedChars;
	const displayedLines: Token[][] = [];
	let currentLineTokens: Token[] = [];
	let currentLineCharCount = 0;
	let cursorLine = 0;
	let cursorCol = 0;

	for (let lineIdx = 0; lineIdx < codeLines.length; lineIdx++) {
		const line = codeLines[lineIdx];
		let lineConsumed = 0;
		const displayTokens: Token[] = [];

		for (const token of line) {
			if (remainingChars <= 0) break;
			const take = Math.min(token.text.length, remainingChars);
			displayTokens.push({text: token.text.slice(0, take), color: token.color});
			remainingChars -= take;
			lineConsumed += take;
			if (remainingChars <= 0) {
				cursorLine = lineIdx;
				cursorCol = lineConsumed;
				break;
			}
		}

		if (remainingChars > 0) {
			remainingChars--; // 消耗换行符
			if (remainingChars >= 0) {
				displayedLines.push(displayTokens);
				currentLineTokens = [];
				currentLineCharCount = 0;
			}
			if (remainingChars < 0) {
				cursorLine = lineIdx;
				cursorCol = lineConsumed;
			}
		} else {
			displayedLines.push(displayTokens);
			if (remainingChars <= 0 && lineConsumed > 0) {
				// 光标在这一行
			}
			break;
		}
	}

	// 如果没打完所有行，最后光标在最后一行末尾
	if (remainingChars > 0 && codeLines.length > 0) {
		cursorLine = codeLines.length - 1;
		const lastLine = codeLines[codeLines.length - 1];
		cursorCol = lastLine.reduce((acc, t) => acc + t.text.length, 0);
	}

	// 光标闪烁（1.2秒周期）
	const cursorVisible = Math.sin((frame * Math.PI * 2) / (fps * 1.2)) > -0.3;

	// 终端输出动画
	const terminalStart =
		codeLines.reduce(
			(acc, line) => acc + line.reduce((s, t) => s + t.text.length, 0) + 1,
			0,
		) /
			charsPerFrame +
		typeStartFrame +
		15;
	const terminalVisible = frame > terminalStart;
	const terminalLines = [
		'bun run dev',
		'[ ready ] http://localhost:3000',
		'✓ Counter component loaded',
	];
	const terminalTyped: string[] = [];
	if (terminalVisible) {
		const terminalChars = Math.floor((frame - terminalStart) * charsPerFrame);
		let remaining = terminalChars;
		for (const line of terminalLines) {
			if (remaining <= 0) break;
			const take = Math.min(line.length, remaining);
			terminalTyped.push(line.slice(0, take));
			remaining -= take;
			if (remaining > 0) remaining--; // 换行
		}
	}

	// 窗口进入动画
	const windowOpacity = interpolate(frame, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const windowScale = interpolate(frame, [0, 22], [0.92, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const windowY = interpolate(frame, [0, 22], [20, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	// 侧边栏文件树
	const files = [
		{name: 'src', icon: '📁', indent: 0},
		{name: '  components', icon: '📁', indent: 1},
		{name: '    Counter.tsx', icon: '⚛', indent: 2, active: true},
		{name: '    Button.tsx', icon: '⚛', indent: 2},
		{name: '  hooks', icon: '📁', indent: 1},
		{name: '    useCounter.ts', icon: '📄', indent: 2},
		{name: 'App.tsx', icon: '⚛', indent: 0},
		{name: 'index.tsx', icon: '📄', indent: 0},
		{name: 'package.json', icon: '📦', indent: 0},
	];

	const sidebarWidth = 260;
	const lineHeight = 32;
	const editorPadding = 24;
	const fontSize = 18;
	const charWidth = 10.8;

	return (
		<AbsoluteFill
			style={{
				background:
					'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
				fontFamily:
					"'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* 背景装饰 */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(ellipse at 30% 20%, rgba(56,189,248,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.06) 0%, transparent 50%)',
				}}
			/>

			{/* VS Code 窗口 */}
			<div
				style={{
					width: 1400,
					height: 900,
					background: '#1e1e1e',
					borderRadius: 12,
					overflow: 'hidden',
					boxShadow:
						'0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
					display: 'flex',
					flexDirection: 'column',
					opacity: windowOpacity,
					transform: `scale(${windowScale}) translateY(${windowY}px)`,
				}}
			>
				{/* 标题栏 */}
				<div
					style={{
						height: 38,
						background: '#3c3c3c',
						display: 'flex',
						alignItems: 'center',
						padding: '0 14px',
						gap: 8,
						flexShrink: 0,
					}}
				>
					{/* 红绿灯 */}
					<div style={{display: 'flex', gap: 8}}>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: '50%',
								background: '#ff5f56',
							}}
						/>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: '50%',
								background: '#ffbd2e',
							}}
						/>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: '50%',
								background: '#27c93f',
							}}
						/>
					</div>
					{/* 文件名 */}
					<div
						style={{
							marginLeft: 'auto',
							marginRight: 'auto',
							color: '#cccccc',
							fontSize: 13,
							fontFamily:
								"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
							fontWeight: 500,
						}}
					>
						Counter.tsx — Remotion
					</div>
				</div>

				{/* 主体区域 */}
				<div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
					{/* 左侧边栏 */}
					<div
						style={{
							width: sidebarWidth,
							background: '#252526',
							borderRight: '1px solid #1e1e1e',
							display: 'flex',
							flexDirection: 'column',
							flexShrink: 0,
						}}
					>
						{/* 活动栏图标 */}
						<div
							style={{
								width: 48,
								background: '#333333',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								paddingTop: 12,
								gap: 20,
								flexShrink: 0,
							}}
						>
							{['📄', '🔍', '🌿', '🐛', '📦', '⚡'].map((icon, i) => (
								<div
									key={i}
									style={{
										width: 36,
										height: 36,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 18,
										borderRadius: 6,
										background: i === 0 ? '#37373d' : 'transparent',
									}}
								>
									{icon}
								</div>
							))}
						</div>

						{/* 资源管理器 */}
						<div style={{flex: 1, padding: '10px 12px', overflow: 'hidden'}}>
							<div
								style={{
									color: '#bbbbbb',
									fontSize: 11,
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '0.5px',
									marginBottom: 8,
									fontFamily:
										"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
								}}
							>
								Explorer
							</div>
							{files.map((f, i) => (
								<div
									key={i}
									style={{
										display: 'flex',
										alignItems: 'center',
										padding: '3px 6px',
										paddingLeft: 6 + f.indent * 14,
										borderRadius: 4,
										background: f.active ? '#37373d' : 'transparent',
										color: f.active ? '#ffffff' : '#cccccc',
										fontSize: 13,
										cursor: 'default',
									}}
								>
									<span style={{marginRight: 6, fontSize: 12}}>{f.icon}</span>
									<span style={{fontWeight: f.active ? 500 : 400}}>
										{f.name.replace(/^\s+/, '')}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* 编辑器区域 */}
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							overflow: 'hidden',
						}}
					>
						{/* 标签栏 */}
						<div
							style={{
								height: 36,
								background: '#2d2d2d',
								display: 'flex',
								alignItems: 'center',
								borderBottom: '1px solid #252526',
								flexShrink: 0,
							}}
						>
							<div
								style={{
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									padding: '0 16px',
									background: '#1e1e1e',
									borderTop: '1px solid #007acc',
									color: '#ffffff',
									fontSize: 13,
									gap: 8,
								}}
							>
								<span style={{color: '#519aba', fontSize: 14}}>⚛</span>
								Counter.tsx
								<span style={{color: '#858585', marginLeft: 4, fontSize: 16}}>
									×
								</span>
							</div>
							<div
								style={{
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									padding: '0 16px',
									color: '#969696',
									fontSize: 13,
									gap: 8,
								}}
							>
								<span style={{color: '#519aba', fontSize: 14}}>⚛</span>
								App.tsx
							</div>
						</div>

						{/* Breadcrumb */}
						<div
							style={{
								height: 28,
								background: '#1e1e1e',
								display: 'flex',
								alignItems: 'center',
								padding: '0 20px',
								color: '#a9a9a9',
								fontSize: 12,
								borderBottom: '1px solid #252526',
								flexShrink: 0,
								fontFamily:
									"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
							}}
						>
							src <span style={{margin: '0 6px', color: '#858585'}}> </span>{' '}
							components{' '}
							<span style={{margin: '0 6px', color: '#858585'}}>{' >'}</span>{' '}
							Counter.tsx
						</div>

						{/* 代码编辑区 */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								overflow: 'hidden',
								position: 'relative',
							}}
						>
							{/* 行号栏 */}
							<div
								style={{
									width: 56,
									background: '#1e1e1e',
									borderRight: '1px solid #2d2d2d',
									paddingTop: editorPadding,
									textAlign: 'right',
									paddingRight: 16,
									color: '#858585',
									fontSize,
									lineHeight: `${lineHeight}px`,
									flexShrink: 0,
									userSelect: 'none',
								}}
							>
								{codeLines.map((_, i) => (
									<div key={i} style={{height: lineHeight}}>
										{i + 1}
									</div>
								))}
							</div>

							{/* 代码区域 */}
							<div
								style={{
									flex: 1,
									padding: `${editorPadding}px 20px`,
									fontSize,
									lineHeight: `${lineHeight}px`,
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								{codeLines.map((line, lineIdx) => {
									const isCurrentLine = lineIdx === cursorLine;
									const lineTokens = displayedLines[lineIdx] || [];

									return (
										<div
											key={lineIdx}
											style={{
												height: lineHeight,
												display: 'flex',
												alignItems: 'center',
												position: 'relative',
												background:
													isCurrentLine && cursorVisible
														? 'rgba(255,255,255,0.04)'
														: 'transparent',
											}}
										>
											{lineTokens.map((token, tokenIdx) => (
												<span
													key={tokenIdx}
													style={{color: token.color, whiteSpace: 'pre'}}
												>
													{token.text}
												</span>
											))}
											{/* 光标 */}
											{isCurrentLine && cursorVisible && (
												<div
													style={{
														position: 'absolute',
														left: lineTokens.reduce(
															(acc, t) => acc + t.text.length * charWidth,
															0,
														),
														top: 2,
														width: 2,
														height: lineHeight - 4,
														background: '#007acc',
														animation: 'none',
													}}
												/>
											)}
										</div>
									);
								})}
							</div>
						</div>

						{/* 底部状态栏 */}
						<div
							style={{
								height: 24,
								background: '#007acc',
								display: 'flex',
								alignItems: 'center',
								padding: '0 14px',
								color: '#ffffff',
								fontSize: 12,
								flexShrink: 0,
								fontFamily:
									"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
								justifyContent: 'space-between',
							}}
						>
							<div style={{display: 'flex', gap: 16}}>
								<span>🌿 main*</span>
								<span>0 errors, 0 warnings</span>
							</div>
							<div style={{display: 'flex', gap: 16}}>
								<span>
									Ln {cursorLine + 1}, Col {cursorCol + 1}
								</span>
								<span>UTF-8</span>
								<span>TypeScript JSX</span>
								<span>Prettier</span>
							</div>
						</div>
					</div>
				</div>

				{/* 终端面板（可选，淡入） */}
				{terminalVisible && (
					<div
						style={{
							height: 160,
							background: '#1e1e1e',
							borderTop: '1px solid #333333',
							display: 'flex',
							flexDirection: 'column',
							flexShrink: 0,
						}}
					>
						<div
							style={{
								height: 32,
								background: '#252526',
								display: 'flex',
								alignItems: 'center',
								padding: '0 14px',
								gap: 20,
								borderBottom: '1px solid #1e1e1e',
							}}
						>
							{['TERMINAL', 'OUTPUT', 'DEBUG CONSOLE', 'PROBLEMS'].map(
								(tab, i) => (
									<span
										key={tab}
										style={{
											color: i === 0 ? '#ffffff' : '#858585',
											fontSize: 11,
											fontWeight: i === 0 ? 600 : 400,
											borderBottom: i === 0 ? '1px solid #007acc' : 'none',
											paddingBottom: 8,
											marginTop: 8,
										}}
									>
										{tab}
									</span>
								),
							)}
						</div>
						<div
							style={{
								flex: 1,
								padding: '10px 16px',
								fontSize: 14,
								lineHeight: '22px',
								color: '#cccccc',
								overflow: 'hidden',
							}}
						>
							{terminalTyped.map((line, i) => (
								<div key={i} style={{display: 'flex', alignItems: 'center'}}>
									{i === 0 ? (
										<>
											<span style={{color: '#27c93f', marginRight: 8}}>➜</span>
											<span style={{color: '#519aba'}}>
												~/projects/remotion
											</span>
											<span style={{marginRight: 8}}> </span>
											<span>{line}</span>
										</>
									) : (
										<span style={{color: i === 1 ? '#858585' : '#27c93f'}}>
											{line}
										</span>
									)}
								</div>
							))}
							{terminalTyped.length === terminalLines.length && (
								<div style={{display: 'flex', alignItems: 'center'}}>
									<span style={{color: '#27c93f', marginRight: 8}}>➜</span>
									<span style={{color: '#519aba'}}>~/projects/remotion</span>
									<span style={{marginRight: 8}}> </span>
									<span
										style={{
											width: 8,
											height: 16,
											background: '#007acc',
											display: 'inline-block',
											opacity: cursorVisible ? 1 : 0,
										}}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			{/* 左下角 Logo 水印 */}
			<div
				style={{
					position: 'absolute',
					bottom: 30,
					left: 40,
					color: 'rgba(255,255,255,0.25)',
					fontSize: 14,
					fontFamily:
						"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
					fontWeight: 500,
					letterSpacing: '1px',
				}}
			>
				Powered by Remotion
			</div>
		</AbsoluteFill>
	);
};

export {VSCodeCodingScene};
