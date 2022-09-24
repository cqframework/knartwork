// Author: Preston Lee

export class LifeCycleEvent {
    type: string = LifeCycleEvent.CREATED; // Reasonable default
    datetime: string = '';

    static CREATED = 'Created';
    static PRE_PUBLISHED = 'Pre-published';
    static PUBLISHED = 'Published';
    static REVIEWED = 'Reviewed';
    static WITHDRAWN = 'Withdrawn';
    static SUPERSEDED = 'Superseded';

    static TYPES = [
        LifeCycleEvent.CREATED,
        LifeCycleEvent.PRE_PUBLISHED,
        LifeCycleEvent.PUBLISHED,
        LifeCycleEvent.REVIEWED,
        LifeCycleEvent.WITHDRAWN,
        LifeCycleEvent.SUPERSEDED];
}
