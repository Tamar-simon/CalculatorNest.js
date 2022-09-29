import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { RequestDTO } from "./dto/request.dto";
import { CalcInterface } from "./interfaces/calc.interface";

@Injectable()
export class CalcService{
    constructor(private readonly moduleRef: ModuleRef) {

    }
    async getResult(requestDTO:RequestDTO) {
    const operator = await this.moduleRef.resolve<CalcInterface>(`Operation${requestDTO.operator}`);
    return operator.calculate(requestDTO.number1,requestDTO.number2);
    }
}