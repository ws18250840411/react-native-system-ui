/**
 * Type guard that ensures a value is neither `null` nor `undefined`.
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
    return value !== null && value !== undefined;
};
