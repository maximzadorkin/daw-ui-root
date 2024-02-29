export type SyncContextMap<
    TrackId extends string = string,
    AudioId extends string = string,
    AudioSHA extends string = string,
> = Map<TrackId, Array<{ id: AudioId; sha: AudioSHA }>>;

export type TrackData<AudioId extends string = string> = Map<
    AudioId,
    ArrayBuffer
>;

export type SyncContextDataMap<
    TrackId extends string = string,
    AudioId extends string = string,
> = Map<TrackId, TrackData<AudioId>>;

export interface SyncContextInfo<
    TrackId extends string = string,
    AudioId extends string = string,
> {
    data: SyncContextDataMap<TrackId, AudioId>;
    unavailable: SyncContextMap<TrackId, AudioId>;
}
