export default class Context{
    static gl: WebGL2RenderingContext | undefined;
    static checkGL(): WebGL2RenderingContext{
        if(Context.gl){
            return Context.gl;
        } else {
            throw new Error('There seems to be no canvas');
        }
    }
}