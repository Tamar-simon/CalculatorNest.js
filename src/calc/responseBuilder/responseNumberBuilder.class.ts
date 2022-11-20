import { BuildInterface } from "../interfaces/build.interface";
import { ResponseNumberInterface } from "../interfaces/responseNumber.interface";
import { ResponseNumber } from "../responseModel/responseNumber.class";

export class ResponseNumberBuilder  implements BuildInterface{
   constructor(){}
   build(number:number): ResponseNumberInterface{
      return new ResponseNumber(number);
   }

}