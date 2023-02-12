import { Request, Response } from "express";
import { Controller, Post } from "jazeera";
import { BodyParam } from "jazeera/src/lib/decorators/RouteParams.decorator";
import { TracesService } from "../services/traces.service";

@Controller()
export class TraceController {

    constructor(private readonly tracesService: TracesService) { }
    
    @Post('/traces')
    public async traces(@BodyParam('ip') ip: string, req: Request, res: Response) {
        try {               
            const response = await this.tracesService.getTraceInformation(ip);
            res.json(response.toPrimitives());
        } catch (error) {
            res.status(error.status).json({message: error.message});
        }
    }

}