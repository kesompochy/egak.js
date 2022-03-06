type ProgressManager = (all: number, rest: number)=>void;

export default class Loader {
    private static _resources: Map<string, ImageBitmap> = new Map();
    private static _tasks: Array<Promise<unknown>> = [];
    private static _loadThen: Function = function(){};
    private static _taskNum: number = 0;
    private static _progressManager: ProgressManager = ()=>{};

    static add(id: string, src: string): Loader{
        const promise = this._promiseLoadingImage(id, src);
        this._tasks.push(promise);
        
        return this;
    }
    static loadAll(): void{
        this._taskNum = this._tasks.length;
        this._progressManager(this._taskNum, this._taskNum);
        Promise.all(this._tasks)
            .then(()=>{
                this._loadThen();
            });
        
    }
    private static _promiseLoadingImage(id: string, src: string): Promise<unknown>{
        const promise = new Promise((resolve)=>{
            fetch(src).then(res=>res.blob())
                    .then(blob=>createImageBitmap(blob))
                    .then(data=>{
                        this._resources.set(id, data);
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
    

    static get(id: string): WebGLTexture | undefined{
        if(this._resources.has(id)){
            return this._resources.get(id);
        } else {
            return undefined;
        }
    }
}