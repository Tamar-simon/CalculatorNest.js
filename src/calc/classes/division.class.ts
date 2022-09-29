import { Controller, Get } from "@nestjs/common";
import { CalcInterface } from "../interfaces/calc.interface";


export class Division implements CalcInterface{
    constructor() {
    }

    calculate(number1:number,number2:number){
        return number1 / number2;
    }

}