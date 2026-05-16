import React from 'react';
import {Composition, Folder} from 'remotion';
import {BeijingCardsScene} from './BeijingCardsIntro';
import {CinematicTextIntro} from './CinematicTextIntro';
import {MinimalFadeIntro} from './MinimalFadeIntro';
import {MorphCircleTransition} from './MorphCircleTransition';
import {SlidePushTransition} from './SlidePushTransition';
import {TaipeiCardsScene} from './TaipeiCardsIntro';
import {VSCodeCodingScene} from './VSCodeCodingIntro';

export const Index: React.FC = () => {
	return (
		<Folder name="out">
			<Composition
				id="BeijingCardsIntro"
				component={BeijingCardsScene}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={180}
			/>
			<Composition
				id="CinematicTextIntro"
				component={CinematicTextIntro}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={180}
			/>
			<Composition
				id="MinimalFadeIntro"
				component={MinimalFadeIntro}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={150}
			/>
			<Composition
				id="MorphCircleTransition"
				component={MorphCircleTransition}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={90}
			/>
			<Composition
				id="SlidePushTransition"
				component={SlidePushTransition}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={90}
			/>
			<Composition
				id="TaipeiCardsIntro"
				component={TaipeiCardsScene}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={180}
			/>
			<Composition
				id="VSCodeCodingIntro"
				component={VSCodeCodingScene}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={360}
			/>
		</Folder>
	);
};
