

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
        const img = new Image();
        img.src = src;

        const promise = new Promise((resolve)=>{
            img.addEventListener('load', () => {
                this.resources.set(id, img);
                resolve(img);
            });
        });
        return promise;
    }
    static loadThen(func: Function){
        this._loadThen = func;
    }

    static get(id: string): WebGLTexture{
        const resources = this.resources;
        if(resources.has(id)){
            return this.resources.get(id)!;
        } else {
            throw new Error(`there is no texture named '${id}.`);
        }
    }
}