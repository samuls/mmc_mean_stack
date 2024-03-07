import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name:'convertTemp'
})
export class ConvertTemp implements PipeTransform {
    transform(value: number, args?:any): any {
        if(args == 'F'){
            return (value * 9/5 + 32);
        }else if(args == 'C'){
            return (value - 32) * 5/9;
        }
    }
}