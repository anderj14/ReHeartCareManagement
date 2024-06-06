declare module 'react-big-calendar' {
    import { ComponentType } from 'react';

    export interface Event {
        start: Date;
        end: Date;
        title: string;
    }

    export interface CalendarProps<TEvent = Event, TResource = object> {
        localizer: any;
        events?: TEvent[];
        startAccessor?: string | ((event: TEvent) => Date);
        endAccessor?: string | ((event: TEvent) => Date);
        allDayAccessor?: string | ((event: TEvent) => boolean);
        titleAccessor?: string | ((event: TEvent) => string);
        resourceAccessor?: string | ((event: TEvent) => TResource);
        resources?: TResource[];
        resourceIdAccessor?: string | ((resource: TResource) => any);
        resourceTitleAccessor?: string | ((resource: TResource) => string);
        // Añade otras propiedades necesarias según la documentación de react-big-calendar
        [propName: string]: any;
    }

    export const Calendar: ComponentType<CalendarProps>;
    export function dayjsLocalizer(momentInstance: any): any;

    export type Blockout = { id: number; name: string };

}
