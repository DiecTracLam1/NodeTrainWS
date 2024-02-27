import { injectable, inject } from "inversify";
import express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam , next } from "inversify-express-utils";

@controller('/employees')
export class EmployeeController implements interfaces.Controller {
    @httpGet("/")
    private index(@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction){
        res.send('employees');
    }
}
