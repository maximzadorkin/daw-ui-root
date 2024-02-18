import { SoundWave } from '@entities/sound-wave';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { ScrollControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import SecondaryToThreePoints from '@shared/audio/SecondaryToThreePoints';
import { Background } from '@shared/components/three/background';
import { Divider } from '@shared/components/three/divider';
import {
    AudioViewModel,
    TrackViewModel,
    useProjectViewModel,
} from '@shared/stores';
import {
    preventBackTrackPadNavigation,
    resetBackTrackPadNavigation,
} from '@shared/lib/dom';
import { HorizontalScrollable, VerticalScrollable } from '@features/scrollable';
import { TimeSlider } from '@features/time-slider';
import { TrackList, TrackTimeline } from '@entities/track';
import { Audio } from '@entities/audio';

const SIDE_WIDTH = 220;
const TRACK_HEIGHT = 48;
const TIME_SLIDER_ICON_HEIGHT = 12;

const ProjectTimelineThree: FC = observer(() => {
    const size = useThree(({ size }) => size);
    const store = useProjectViewModel();
    const { current: secondsConverter } = useRef(new SecondaryToThreePoints());
    const overflowRef = useRef(document.body.style.overscrollBehaviorX);

    const TIME_SLIDER_HEIGHT = size.height;
    const TIMELINE_HEIGHT = store.tracks.length * TRACK_HEIGHT;
    const TIMELINE_VIEW_WIDTH = size.width - SIDE_WIDTH;
    const TIMELINE_FULL_WIDTH = Math.max(
        secondsConverter.secondsToPoints(store.duration) +
            secondsConverter.secondsToPoints(60),
        TIMELINE_VIEW_WIDTH,
    );
    const TIMELINE_HORIZONTAL_PAGES = TIMELINE_FULL_WIDTH / TIMELINE_VIEW_WIDTH;
    const VERTICAL_PAGES = Math.min(0, TIMELINE_HEIGHT / size.height - 1);

    useEffect(() => {
        preventBackTrackPadNavigation();

        return resetBackTrackPadNavigation;
    }, []);

    const renderAudioNode = (
        track: TrackViewModel,
        audio: AudioViewModel,
    ): ReactNode => (
        <Audio key={audio.id} height={TRACK_HEIGHT} track={track} audio={audio}>
            <SoundWave
                height={TRACK_HEIGHT - 10}
                position={[0, 0, 0]}
                audio={audio}
            />
        </Audio>
    );

    const renderTracks = (track: TrackViewModel, index: number): ReactNode => (
        <TrackTimeline
            key={track.id}
            track={track}
            size={[TIMELINE_FULL_WIDTH, TRACK_HEIGHT]}
            position={[
                TIMELINE_FULL_WIDTH / 2,
                -(TRACK_HEIGHT / 2) - TRACK_HEIGHT * index,
                0,
            ]}
        >
            {track.audios.map((audio) => renderAudioNode(track, audio))}
        </TrackTimeline>
    );

    const withTimeSliderYPosition = (value: number): number =>
        value - TIME_SLIDER_ICON_HEIGHT;

    return (
        <ScrollControls pages={VERTICAL_PAGES} damping={0.03}>
            <group
                position={[
                    0,
                    // -(size.width / 2),
                    withTimeSliderYPosition(0),
                    0,
                ]}
            >
                <group name="border">
                    <Divider
                        position={[0, size.height / 2, 0]}
                        width={size.width}
                    />
                </group>
                <group name="sidebar" position={[-size.width / 2, 0, 3]}>
                    <Background
                        position={[SIDE_WIDTH / 2, TIME_SLIDER_ICON_HEIGHT, 0]}
                        size={[SIDE_WIDTH, size.height]}
                    >
                        <group position={[0, -TIME_SLIDER_ICON_HEIGHT, 0]}>
                            <VerticalScrollable>
                                <TrackList
                                    position={[
                                        -SIDE_WIDTH / 2,
                                        size.height / 2,
                                        1,
                                    ]}
                                    trackHeight={TRACK_HEIGHT}
                                    width={SIDE_WIDTH}
                                />
                            </VerticalScrollable>
                        </group>
                    </Background>
                    <Divider
                        position={[SIDE_WIDTH, 0, 3]}
                        height={size.height}
                    />
                </group>
                <group
                    name="timeline"
                    position={[
                        -size.width / 2 + SIDE_WIDTH,
                        size.height / 2,
                        0,
                    ]}
                >
                    <VerticalScrollable>
                        <group position={[0, 0, 0]}>
                            <HorizontalScrollable
                                pages={TIMELINE_HORIZONTAL_PAGES}
                                size={TIMELINE_VIEW_WIDTH}
                            >
                                {store.tracks.map(renderTracks)}
                                <TimeSlider
                                    size={[2, TIME_SLIDER_HEIGHT]}
                                    position={[1, -TIME_SLIDER_HEIGHT / 2, 2]}
                                    timelineWidth={TIMELINE_FULL_WIDTH}
                                />
                            </HorizontalScrollable>
                        </group>
                    </VerticalScrollable>
                </group>
            </group>
        </ScrollControls>
    );
});

export { ProjectTimelineThree };
