export type RoundStrategy = "round" | "floor" | "ceil";

export type RoundToStepOptions = {
    /**
     * Determines how the rounding should behave when the value falls between steps.
     * Defaults to 'round'.
     */
    strategy?: RoundStrategy;
    /**
     * Offset that the stepping should start from. Useful for ranges that do not
     * start at zero.
     */
    origin?: number;
};

const STRATEGIES: Record<RoundStrategy, (value: number) => number> = {
    round: Math.round,
    floor: Math.floor,
    ceil: Math.ceil,
};

/**
 * Rounds a value to the closest multiple of `step`, taking into account a custom
 * strategy and origin offset.
 */
export const roundToStep = (
    value: number,
    step: number,
    options?: RoundToStepOptions,
): number => {
    if (step <= 0) {
        throw new RangeError("roundToStep: `step` must be greater than zero.");
    }
    if (!Number.isFinite(value)) {
        throw new TypeError("roundToStep: `value` must be a finite number.");
    }

    const strategy = options?.strategy ?? "round";
    const origin = options?.origin ?? 0;
    const roundFn = STRATEGIES[strategy];

    const normalised = (value - origin) / step;
    return roundFn(normalised) * step + origin;
};
