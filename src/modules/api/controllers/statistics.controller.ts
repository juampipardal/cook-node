import { Request, Response } from "express";
import { Controller, Get } from "jazeera";
import { TrackingService } from "../services/tracking.service";

@Controller('/statistics')
export class StatisticsController {

    
    constructor(private readonly trackingService: TrackingService) { }

    @Get('')
    public async statistics(req: Request, res: Response) {
        
        const [longestDistance, getMaxCounter] = await Promise.all([this.trackingService.getLongestDistanceCountry(), this.trackingService.getMaxCounter()]);
        res.json(
            {
                'longest_distance': {
                    'country': longestDistance.country,
                    'distance': longestDistance.distance
            },
                'most_traced': {
                    'country': getMaxCounter.country,
                    'value': getMaxCounter.counter
                }
            }
        );

    }

}