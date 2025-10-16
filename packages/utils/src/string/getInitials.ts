export type GetInitialsOptions = {
    /**
     * Fallback string returned when no initials can be derived.
     * Defaults to '?'.
     */
    fallback?: string;
    /**
     * Maximum number of characters returned.
     * Defaults to 2.
     */
    maxLength?: number;
};

const DEFAULT_FALLBACK = "?";
const DEFAULT_MAX_LENGTH = 2;

/**
 * Derives initials from a display name. Handles edge cases such as
 * extra whitespace, multi-word names, and non-Latin characters.
 *
 * @example
 * getInitials("Ada Lovelace") // 'AL'
 * getInitials("单  名", { maxLength: 1 }) // '单'
 */
export const getInitials = (
    rawName: string | undefined | null,
    options?: GetInitialsOptions,
): string => {
    const fallback = options?.fallback ?? DEFAULT_FALLBACK;
    const requestedMaxLength = options?.maxLength ?? DEFAULT_MAX_LENGTH;
    const maxLength =
        Number.isFinite(requestedMaxLength) && requestedMaxLength
            ? Math.max(1, Math.floor(requestedMaxLength))
            : DEFAULT_MAX_LENGTH;

    if (!rawName) {
        return fallback;
    }

    const name = rawName.trim();
    if (!name) {
        return fallback;
    }

    const parts = name
        .split(/[\s._-]+/)
        .map((segment) => segment.trim())
        .filter(Boolean);

    if (parts.length === 0) {
        return fallback;
    }

    if (parts.length === 1) {
        const firstPart = parts[0];
        if (!firstPart) {
            return fallback;
        }
        return firstPart.slice(0, maxLength).toUpperCase();
    }

    const first = parts[0]?.[0];
    const last = parts[parts.length - 1]?.[0];

    const initials = [first, last]
        .filter((char): char is string => Boolean(char))
        .join("")
        .toUpperCase();

    return initials.slice(0, maxLength || initials.length) || fallback;
};
