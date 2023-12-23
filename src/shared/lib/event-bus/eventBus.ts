import { EVENT_TYPE, EventBusHandler, EventsDetails } from './types';

class EventBus {
    private readonly eventTarget: HTMLElement;

    constructor() {
        this.eventTarget = document.createElement('event-bus');
        document.body.appendChild(this.eventTarget);
    }

    public on = <CustomEvent extends EVENT_TYPE>(
        type: CustomEvent,
        listener: EventBusHandler<CustomEvent>,
    ): void => {
        this.eventTarget.addEventListener(type, listener as EventListener);
    };

    public once = <CustomEvent extends EVENT_TYPE>(
        type: CustomEvent,
        listener: EventBusHandler<CustomEvent>,
    ): void => {
        this.eventTarget.addEventListener(type, listener as EventListener, {
            once: true,
        });
    };

    public off = <CustomEvent extends EVENT_TYPE>(
        type: CustomEvent,
        listener: EventBusHandler<CustomEvent>,
    ): void => {
        this.eventTarget.removeEventListener(type, listener as EventListener);
    };

    public emit = <CustomEvent extends EVENT_TYPE>(
        type: CustomEvent,
        detail?: EventsDetails[CustomEvent],
    ) => {
        return this.eventTarget.dispatchEvent(
            new CustomEvent(type, { detail }),
        );
    };
}

const eventBus = new EventBus();

export { eventBus };
