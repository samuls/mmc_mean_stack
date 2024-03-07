import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name:'summary'
})
export class Summary implements PipeTransform {
    transform(value: any, args: any = 50): any {
        return value.substring(0, args) + ' ... read more';
    }
}