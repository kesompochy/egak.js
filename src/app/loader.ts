

export default class Loader {
    resources: Map<string, any> = new Map();
    tasks: Array<Promise<unknown>> = [];
    private _loadThen: Function = function(){};
    constructor(){
    }
    addImage(id: string, src: string): Loader{
        const promise = this._promiseLoadingImage(id, src);
        this.tasks.push(promise);
        
        return this;
    }
    loadAll(): void{
        Promise.all(this.tasks)
            .then(()=>{this._loadThen();});
    }
    private _promiseLoadingImage(id: string, src: string): Promise<any>{
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
    loadThen(func: Function){
        this._loadThen = func;
    }

    get(id: string): WebGLTexture{
        const resources = this.resources;
        if(resources.has(id)){
            return this.resources.get(id)!;
        } else {
            throw new Error(`there is no texture named '${id}.`);
        }
    }
}