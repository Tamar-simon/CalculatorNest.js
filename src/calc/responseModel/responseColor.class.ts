import { ResponseColorInterface } from "../interfaces/responseColor.interface";

export class ResponseColor implements  ResponseColorInterface {
    number: number;
    color: string;
    constructor(source: Partial<ResponseColor>) {
        this.number = source.number;
        this.color = source.color;
    }
}