/**
 * Restricts a numeric value within the inclusive range defined by `min` and `max`.
 * The bounds can be provided in any order and will be normalised.
 */
export const clamp = (value: number, min: number, max: number): number => {
    if (Number.isNaN(value) || Number.isNaN(min) || Number.isNaN(max)) {
        throw new TypeError("clamp: value, min, and max must be valid numbers.");
    }

    const lower = Math.min(min, max);
    const upper = Math.max(min, max);

    if (value < lower) {
        return lower;
    }
    if (value > upper) {
        return upper;
    }
    return value;
};
