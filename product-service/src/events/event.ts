import {EventNames} from "./event-names";

export interface Event {
    topic: EventNames;
    data: any
}
