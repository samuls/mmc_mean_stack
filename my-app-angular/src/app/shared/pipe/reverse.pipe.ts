import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name:'str_reverse'
})
export class StrReverse implements PipeTransform {
    transform(value: string): string {
        let reverseString = "";
        for (let char of value) {
            reverseString = char + reverseString;
        }
        return reverseString;
    }
}