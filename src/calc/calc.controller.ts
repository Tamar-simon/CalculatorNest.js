import { Body, Controller, Get, Post } from "@nestjs/common";
import { CalcService } from "./calc.service";
import { RequestDTO } from "./dto/request.dto";

@Controller('calc')
export class CalcController {
    constructor(private readonly calcService: CalcService) {
    }
    @Post()
    getResult(@Body() requestDTO: RequestDTO) {
        return this.calcService.getResult(requestDTO);
    }
}