import React from 'react';
import {AbsoluteFill} from 'remotion';

export const ComparisonScene: React.FC<{
	topContent: React.ReactNode;
	bottomContent: React.ReactNode;
}> = ({topContent, bottomContent}) => {
	return (
		<AbsoluteFill style={{flexDirection: 'column', backgroundColor: '#000'}}>
			<div
				style={{
					flex: 1,
					backgroundColor: '#0a1405',
					position: 'relative',
					overflow: 'hidden',
					borderBottom: '4px solid #76B900',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{topContent}
			</div>
			<div
				style={{
					flex: 1,
					backgroundColor: '#1a0505',
					position: 'relative',
					overflow: 'hidden',
					borderTop: '4px solid #C60020',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{bottomContent}
			</div>
		</AbsoluteFill>
	);
};
