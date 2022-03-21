declare type ProgressManager = (all: number, rest: number) => void;
import Texture from '../texture/texture';
export default class Loader {
    private static _resources;
    private static _tasks;
    private static _loadThen;
    private static _taskNum;
    private static _progressManager;
    static loaded: boolean;
    static add(id: string, src: string, scaleMode?: string): Loader;
    static loadAll(): void;
    private static _promiseLoadingImage;
    static loadThen(func: Function): void;
    static manageProgress(func: ProgressManager): void;
    static get(id: string): Texture | undefined;
}
export {};
//# sourceMappingURL=loader.d.ts.map