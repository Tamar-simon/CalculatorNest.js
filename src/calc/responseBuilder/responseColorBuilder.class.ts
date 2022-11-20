import { BuildInterface } from "../interfaces/build.interface";
import { ResponseNumberInterface } from "../interfaces/responseNumber.interface";
import {ResponseColor} from "../responseModel/responseColor.class";

export class ResponseColorBuilder implements BuildInterface{
   constructor(){}
   build(number:number): ResponseNumberInterface{
      const color = number % 2 == 0 ? 'green' : 'red';
      return new ResponseColor({number:number,color:color});
   }

}