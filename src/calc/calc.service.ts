import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { RequestDTO } from "./dto/request.dto";
import { BuildInterface } from "./interfaces/build.interface";
import { CalcInterface } from "./interfaces/calc.interface";
import { ResponseNumberInterface } from "./interfaces/responseNumber.interface";

@Injectable()
export class CalcService{
    constructor(private readonly moduleRef: ModuleRef) {

    }
    async getResult(requestDTO:RequestDTO) {
    const operator = await this.moduleRef.resolve<CalcInterface>(`Operation${requestDTO.operator}`);
    const number =  operator.calculate(requestDTO.number1,requestDTO.number2);// number
    const responseStructure = await this.moduleRef.resolve<BuildInterface>(`Structure${requestDTO.structure}`);
    return responseStructure.build(number);
    }
}
