export default class Loader {
    private static _resources: Map<string, any> = new Map();
    private static _tasks: Array<Promise<unknown>> = [];
    private static _loadThen: Function = function(){};
    constructor(){
    }
    static add(id: string, src: string): Loader{
        const promise = this._promiseLoadingImage(id, src);
        this._tasks.push(promise);
        
        return this;
    }
    static loadAll(): void{
        Promise.all(this._tasks)
            .then(()=>{this._loadThen();});
    }
    private static _promiseLoadingImage(id: string, src: string): Promise<any>{
        const promise = new Promise((resolve)=>{
            fetch(src).then(res=>res.blob())
                    .then(blob=>createImageBitmap(blob))
                    .then(data=>this._resources.set(id, data))
                    .then(img=>resolve(img));
        });
        return promise;
    }
    static loadThen(func: Function): Loader{
        this._loadThen = func;

        if(this._tasks.length === 0){
            func();
        }

        return this;
    }

    static get(id: string): WebGLTexture{
        return this._resources.get(id);
    }
}