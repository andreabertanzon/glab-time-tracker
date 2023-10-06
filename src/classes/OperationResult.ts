type Exception = Error | string;

/**
 * Represents the result of an operation that could either succeed or fail.
 *
 * Usage:
 * ```typescript
 * const successfulResult = OperationResult.Success<string>("This is a success");
 * const errorResultWithoutData = OperationResult.Error<string>("This is an error");
 * const errorResultWithData = OperationResult.Error<string>("This is an error with data", "Some Data");
 * ```
 */
export class OperationResult<T> {
    private constructor(
        public readonly isSuccess: boolean,
        public readonly data?: T,
        public readonly exception?: Exception
    ) {}

    /**
     * Creates a successful operation result.
     * @param data - The data associated with the successful operation.
     */
    public static Success<T>(data: T): OperationResult<T> {
        return new OperationResult<T>(true, data);
    }

    /**
     * Creates an error operation result.
     * @param exception - The exception or error message.
     * @param data - Optional data associated with the error.
     */
    public static Error<T>(exception: Exception, data?: T): OperationResult<T> {
        return new OperationResult<T>(false, data, exception);
    }

    /**
     * Indicates if the operation resulted in a failure.
     */
    public get isFailure(): boolean {
        return !this.isSuccess;
    }
}
