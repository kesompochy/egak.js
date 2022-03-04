export default class Loader {
    static resources: Map<string, any> = new Map();
    static tasks: Array<Promise<unknown>> = [];
    private static _loadThen: Function = function(){};
    constructor(){
    }
    static add(id: string, src: string): Loader{
        const promise = this._promiseLoadingImage(id, src);
        this.tasks.push(promise);
        
        return this;
    }
    static loadAll(): void{
        Promise.all(this.tasks)
            .then(()=>{this._loadThen();});
    }
    private static _promiseLoadingImage(id: string, src: string): Promise<any>{
        const promise = new Promise((resolve)=>{
            fetch(src).then(res=>res.blob())
                    .then(blob=>createImageBitmap(blob))
                    .then(data=>this.resources.set(id, data))
                    .then(img=>resolve(img));
        });
        return promise;
    }
    static loadThen(func: Function){
        this._loadThen = func;
    }

    static get(id: string): WebGLTexture{
        return this.resources.get(id);
    }
}