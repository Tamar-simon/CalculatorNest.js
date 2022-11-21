import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { NumbersList } from "./classes/numberList.class";
import { OperatorsList } from "./classes/operatorsList.class";
import { RequestDTO } from "./dto/request.dto";
import { BuildInterface } from "./interfaces/build.interface";
import { CalcInterface } from "./interfaces/calc.interface";
import { ResponseNumberInterface } from "./interfaces/responseNumber.interface";

@Injectable()
export class CalcService {
    constructor(private readonly moduleRef: ModuleRef) {

    }
    async getResult(requestDTO: RequestDTO) {
        const calculateString = requestDTO.calculateString;
        const numbersClass = new NumbersList(calculateString.split(/[*]|[+]|[-]|[\/]/).map(Number));
        const operators = new OperatorsList(calculateString.split(/[^-|+|\/|\*]/).filter(e => e));
        const numberResult = await this.calculateResult(numbersClass,operators);
        const responseStructure = await this.moduleRef.resolve<BuildInterface>(`Structure${requestDTO.structure}`);
        return responseStructure.build(numberResult);
    }

    // this function calculate the result.
    // the split function devide it by operators. 
    //(2 array) `numbersClass` is for the numbers and `operators` - is for the operators . 
    // this function doesn't support the order of operators.
    //  this expression `2+5*6+2-1` will retrive 43 instead of 33.

    // for example :
    // calculateString = '2+5*6+2-1';
    // numbers: [2,5,6,2,1]
    // operators: [ "+", "*", "+", "-"]
    private async calculateResult(numbersClass: NumbersList, operators: OperatorsList) {
        let numberResult: number = 0;
        for (let i = 0; i < operators.operators.length; i++) {
            const currentOperator = operators.operators[i];
            const operatorInstance = await this.moduleRef.resolve<CalcInterface>(`Operation${currentOperator}`);
            const number1 = i == 0 ? numbersClass.numbers[i] : numberResult;//from the second entry retrive total members.
            const number2 = numbersClass.numbers[i + 1];
            numberResult = operatorInstance.calculate(number1, number2);
        }
        return numberResult;
    }

}
