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
    //  this expression `2+5*6+2-1` will retrive of 33.

    // for example :
    // calculateString = '2+5*6+2-1';
    // numbers: [2,5,6,2,1]
    // operators: [ "+", "*", "+", "-"]

    //in the first iteration calculate  multiply and divide before the plus and minus operation.
    // numbers: [ 2, 30, 2, 1 ]
    // operators:[ '+', '+', '-' ]
    //after calculate all the results.

  
    private async calculateResult(numbersClass: NumbersList, operators: OperatorsList) {
        
        for (let i = 0; i < operators.operators.length; i++) {
            let calculate: number = 0;
            const currentOperator = operators.operators[i];
            if(currentOperator === "*" || currentOperator === "/"){
                calculate = await this.claculate2NumbersWithOperator(numbersClass.numbers[i], numbersClass.numbers[i+1],currentOperator);
                numbersClass.numbers[i] = calculate;
                numbersClass.numbers.splice(i+1, 1);
                operators.operators.splice(i, 1);
            }
        }

        let result: number = 0;
        for (let i = 0; i < operators.operators.length; i++) {
            const currentOperator = operators.operators[i];
            const number1 = i == 0 ? numbersClass.numbers[i] : result;//from the second entry retrive total members.
            const number2 = numbersClass.numbers[i + 1];
            result = await this.claculate2NumbersWithOperator(number1, number2,currentOperator);
        }
        return result;
    }

    private async claculate2NumbersWithOperator(number1: number,number2:number,operator:string){
        const operatorInstance = await this.moduleRef.resolve<CalcInterface>(`Operation${operator}`);
        return operatorInstance.calculate(number1, number2);
    }

}
