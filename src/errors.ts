/**
 * Domain-specific error types thrown by the SDK.
 *
 * Each class extends the native {@link Error} and sets its own `name` so that
 * consumers can branch on `error.name` or `instanceof` checks without having
 * to parse the message string. The constructor signatures intentionally mirror
 * the built-in `Error`, which keeps them interchangeable with code that
 * already accepts an `Error`.
 */

/**
 * Base class for every error thrown by the SDK.
 *
 * Centralising the boilerplate (name, prototype chain, stack capture) keeps
 * the individual subclasses small and guarantees consistent behaviour across
 * runtimes — Node, browsers, and older transpilers that drop the prototype
 * chain when extending built-ins.
 */
class QuranSdkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
        // Restore the prototype chain — needed when the code is downlevelled
        // to ES5 because `extends Error` loses it there.
        Object.setPrototypeOf(this, new.target.prototype);
        // V8-only helper; the guard keeps non-V8 runtimes happy.
        if (typeof (Error as any).captureStackTrace === "function") {
            (Error as any).captureStackTrace(this, new.target);
        }
    }
}

/** Thrown when a caller passes a language code outside {@link ALLOWED_LANGUAGES}. */
export class LanguageValidationError extends QuranSdkError { }

/** Thrown for invalid arguments to any of the audio-recitation endpoints. */
export class AudioError extends QuranSdkError { }

/** Thrown for invalid arguments to any of the chapter endpoints. */
export class ChapterError extends QuranSdkError { }

/** Thrown for invalid arguments to any of the resource endpoints. */
export class ResourceError extends QuranSdkError { }

/** Thrown for invalid arguments to any of the verse endpoints. */
export class VerseError extends QuranSdkError { }
