type ProgressManager = (all: number, rest: number)=>void;

import Texture from '../texture/texture';
import { SCALE_MODE } from '../texture/texture';

export default class Loader {
    private static _resources: Map<string, Texture> = new Map();
    private static _tasks: Array<Promise<unknown>> = [];
    private static _loadThen: Function = function(){};
    private static _taskNum: number = 0;
    private static _progressManager: ProgressManager = ()=>{};

    static loaded: boolean = false;

    static add(id: string, src: string, scaleMode?: string): Loader{
        this.loaded = false;
        const promise = this._promiseLoadingImage(id, src, scaleMode);
        this._tasks.push(promise);
        
        return this;
    }
    static loadAll(): void{
        this._taskNum = this._tasks.length;
        this._progressManager(this._taskNum, this._taskNum);
        Promise.all(this._tasks)
            .then(()=>{
                this.loaded = true;
                this._loadThen();
            });
        
    }
    private static _promiseLoadingImage(id: string, src: string, scaleMode: string = 'NEAREST'): Promise<unknown>{
        const promise = new Promise((resolve)=>{
            fetch(src).then(res=>res.blob())
                    .then(blob=>createImageBitmap(blob))
                    .then(data=>{
                        this._resources.set(id, new Texture(data, SCALE_MODE[scaleMode]));
                        this._tasks.shift();
                        this._progressManager(this._taskNum, this._tasks.length);
                        resolve(data);
                    });
        });
        return promise;
    }
    static loadThen(func: Function){
        this._loadThen = func;

        if(this._tasks.length === 0){
            func();
        }
    }
    static manageProgress(func: ProgressManager){
        this._progressManager = func;
    }
    

    static get(id: string): Texture | undefined{
        if(this._resources.has(id)){
            return this._resources.get(id);
        } else {
            return undefined;
        }
    }
}