import { Module } from '@nestjs/common';
import { Subscription } from 'rxjs';
import { CalcController } from './calc.controller';
import { CalcService } from './calc.service';
import { Addition } from './classes/addition.class';
import { Division } from './classes/division.class';
import { Multiply } from './classes/multiply.class';
import { Subtraction } from './classes/subtraction.class';
import { ResponseColorBuilder } from './responseBuilder/responseColorBuilder.class';
import { ResponseNumberBuilder } from './responseBuilder/responseNumberBuilder.class';

@Module({
    controllers:[CalcController],
    providers:[
        CalcService,
        {
            provide: "Operation+",
            useClass: Addition
        },
        {
            provide: "Operation-",
            useClass: Subtraction
        },
        {
            provide: "Operation*",
            useClass: Multiply
        },
        {
            provide: "Operation/",
            useClass: Division
        },
        {
            provide:"StructureNumber",
            useClass: ResponseNumberBuilder
        },
        {
            provide:"StructureColor",
            useClass: ResponseColorBuilder
        }
    ]
})
export class CalcModule {}
