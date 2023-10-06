/**
 * Represents the concept of "doing nothing" or a "no-op" (no operation).
 * Typically used in contexts where a value is required, but no meaningful value is needed.
 */
export class Unit {
    private constructor() {}

    /**
     * Returns an instance of Unit.
     */
    public static of(): Unit {
        return new Unit();
    }

    /**
     * A no-op method to emphasize the "do nothing" concept.
     */
    public doNothing(): void {
        // Intentionally empty.
    }
}