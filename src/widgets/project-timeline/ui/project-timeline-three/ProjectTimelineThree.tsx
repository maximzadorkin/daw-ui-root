import { SoundWave } from '@entities/sound-wave';
import { AudioNodeStore } from '@shared/stores/audio-node/AudioNodeStore';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { ScrollControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Divider } from '@shared/components/three/divider';
import { TrackStore, useProjectStore } from '@shared/stores';
import { HorizontalScrollable, VerticalScrollable } from '@features/scrollable';
import { TrackList, TrackTimeline } from '@entities/track';
import { AudioNode } from '@entities/audio-node';

const SIDE_WIDTH = 220;
const TRACK_HEIGHT = 48;

const ProjectTimelineThree: FC = observer(() => {
    const size = useThree(({ size }) => size);
    const store = useProjectStore();
    const overflowRef = useRef(document.body.style.overscrollBehaviorX);
    const pages =
        Math.ceil((store.tracks.length * TRACK_HEIGHT) / size.height) - 1;

    // prevent trackpad "back navigation"
    useEffect(() => {
        document.body.style.overscrollBehaviorX = 'none';

        return () => {
            document.body.style.overscrollBehaviorX = overflowRef.current;
        };
    }, []);

    const timelineWidth = size.width - SIDE_WIDTH;

    const renderAudioNode = (
        track: TrackStore,
        audioNode: AudioNodeStore,
    ): ReactNode => (
        <AudioNode height={TRACK_HEIGHT} track={track} audioNode={audioNode}>
            <SoundWave position={[0, 0, 0]} audioNode={audioNode} />
        </AudioNode>
    );

    const renderTracks = (track: TrackStore, index: number): ReactNode => (
        <TrackTimeline
            track={track}
            size={[timelineWidth, 48]}
            position={[
                (size.width - SIDE_WIDTH) / 2,
                -(TRACK_HEIGHT / 2) - TRACK_HEIGHT * index,
                0,
            ]}
        >
            {track.audioNodes.map((audioNode) =>
                renderAudioNode(track, audioNode),
            )}
        </TrackTimeline>
    );

    return (
        <ScrollControls pages={pages} damping={0.03}>
            <group position={[-(size.width / 2), size.height / 2, 0]}>
                {/*group start to -x,-y from 0, 0*/}
                <VerticalScrollable>
                    <TrackList
                        position={[0, 0, 0]}
                        trackHeight={TRACK_HEIGHT}
                        width={SIDE_WIDTH}
                    />
                </VerticalScrollable>
                <Divider
                    position={[SIDE_WIDTH, -size.height / 2, 0]}
                    height={size.height}
                />
                <group position={[SIDE_WIDTH, 0, -2]}>
                    <VerticalScrollable>
                        <group position={[0, 0, 0]}>
                            <HorizontalScrollable
                                pages={
                                    Math.max(
                                        Math.ceil(timelineWidth / size.width) -
                                            1,
                                        0,
                                    ) + 0.5
                                }
                            >
                                {store.tracks.map(renderTracks)}
                            </HorizontalScrollable>
                        </group>
                    </VerticalScrollable>
                </group>
            </group>
        </ScrollControls>
    );
});

export { ProjectTimelineThree };
