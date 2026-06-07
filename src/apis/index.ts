/**
 * Barrel re-export for every API namespace exposed by the SDK.
 *
 * Each named export here is a *namespace object* — a collection of methods
 * grouped by Quran-API resource family (audio, chapter, juz, quran, resource,
 * verse). The grouping mirrors the structure of the upstream quran.com REST
 * API and keeps the call-site readable, e.g. `chapter.listChapters()`.
 */
export * from './audio';
export * from './chapter';
export * from './juz';
export * from './quran';
export * from './resource';
export * from './verse';
