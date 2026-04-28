import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Sequence1} from './Sequence1';
import {Sequence2} from './Sequence2';
import {Sequence3} from './Sequence3';
import {Sequence4} from './Sequence4';
import {Sequence5} from './Sequence5';
import {Sequence6} from './Sequence6';

export const Main: React.FC = () => {
	// Frames at 60 FPS
	// Seq 1: 0 - 5s (300 frames)
	// Seq 2: 5 - 15s (600 frames)
	// Seq 3: 15 - 25s (600 frames)
	// Seq 4: 25 - 35s (600 frames)
	// Seq 5: 35 - 45s (600 frames)
	// Seq 6: 45 - 60s (900 frames)

	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<Sequence  durationInFrames={300} name="Sequence 1">
				<Sequence1 />
			</Sequence>

			<Sequence from={300} durationInFrames={600} name="Sequence 2">
				<Sequence2 />
			</Sequence>

			<Sequence from={900} durationInFrames={600} name="Sequence 3">
				<Sequence3 />
			</Sequence>

			<Sequence from={1500} durationInFrames={600} name="Sequence 4">
				<Sequence4 />
			</Sequence>

			<Sequence from={2100} durationInFrames={600} name="Sequence 5">
				<Sequence5 />
			</Sequence>

			<Sequence from={2700} durationInFrames={900} name="Sequence 6">
				<Sequence6 />
			</Sequence>
		</AbsoluteFill>
	);
};
