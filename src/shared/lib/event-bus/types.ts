import { THEME_TYPE } from '@shared/styles/types';
import { EVENT_TYPE, EventsDetails } from './types.register';

type EventBusHandler<EventType extends EVENT_TYPE> = (
    themeEvent: CustomEvent<EventsDetails[EventType]>,
) => void;

export { EVENT_TYPE };
export type { EventsDetails, EventBusHandler };
