/**
 * Standard API response format
 */
export class ApiResponse {
    constructor(success, message, data = null, errors = null) {
        this.success = success;
        this.message = message;
        if (data !== null) this.data = data;
        if (errors !== null) this.errors = errors;
        this.timestamp = new Date().toISOString();
    }

    static success(message, data = null) {
        return new ApiResponse(true, message, data);
    }

    static error(message, errors = null) {
        return new ApiResponse(false, message, null, errors);
    }
}

/**
 * Async handler wrapper to catch errors
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
