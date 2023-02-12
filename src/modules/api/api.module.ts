import { Module } from "jazeera";
import { StatisticsController } from "./controllers/statistics.controller";
import { TraceController } from "./controllers/trace.controller";

@Module({
    prefix: '',
    controllers: [TraceController, StatisticsController]
})
export class ApiModule { }