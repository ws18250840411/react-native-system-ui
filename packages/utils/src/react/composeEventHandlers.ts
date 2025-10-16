export type EventWithDefault = {
    defaultPrevented?: boolean;
};

export type EventHandler<E> = ((event: E) => void) | undefined | null;

export type ComposeEventHandlersOptions = {
    /**
     * When true, stops execution if any handler calls `event.preventDefault()`.
     * Defaults to false.
     */
    checkDefaultPrevented?: boolean;
};

/**
 * Combines multiple event handlers into one. The resulting handler calls
 * each handler in order, optionally short-circuiting when `preventDefault`
 * has been invoked.
 */
export const composeEventHandlers =
    <E extends EventWithDefault>(
        handlers: EventHandler<E>[],
        options?: ComposeEventHandlersOptions,
    ) =>
    (event: E) => {
        for (const handler of handlers) {
            if (!handler) {
                continue;
            }
            handler(event);
            if (options?.checkDefaultPrevented && event.defaultPrevented) {
                break;
            }
        }
    };
