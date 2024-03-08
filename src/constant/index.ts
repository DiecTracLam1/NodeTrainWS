import { fluentProvide } from "inversify-binding-decorators";

export const fluentContext = (symbol:any,name:any)=>fluentProvide(symbol).whenTargetNamed(name).done()
