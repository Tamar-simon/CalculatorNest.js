
import { ResponseNumberInterface } from "../interfaces/responseNumber.interface";

export class ResponseNumber implements ResponseNumberInterface {
    number:number
    constructor(number:number) {
        this.number = number;
    }
}