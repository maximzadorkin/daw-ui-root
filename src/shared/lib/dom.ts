const preventBackTrackPadNavigation = (): void => {
    document.body.style.overscrollBehaviorX = 'none';
};

const resetBackTrackPadNavigation = (): void => {
    document.body.style.overscrollBehaviorX = 'auto';
};

export { preventBackTrackPadNavigation, resetBackTrackPadNavigation };
