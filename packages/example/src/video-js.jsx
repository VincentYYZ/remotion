import {Composition} from 'remotion';
import {Main as HuaweiVsNvidiaMain} from './HuaweiVsNvidia/Main';

export const Index = () => {
	return (
		<>
			<Composition
				id="huawei-vs-nvidia"
				component={HuaweiVsNvidiaMain}
				width={1080}
				height={1920}
				fps={60}
				durationInFrames={4800}
			/>
		</>
	);
};
