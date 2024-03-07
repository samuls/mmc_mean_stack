import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[CC]'
})
export class ColorChanger {
    // constructor(private ren:Renderer2,ef:ElementRef) {
    //     this.ren.setStyle(ef.nativeElement,'backgroundColor','red')
    // }

    private defaultColor:string = 'white';

    @HostListener('mouseenter')
    addColor(){
        this.defaultColor = 'orange';
    }

    @HostListener('mouseleave')
    removeColor(){
        this.defaultColor = 'white';
    }

    @HostBinding('style.backgroundColor')
    get appStyle(){
        return this.defaultColor;
    }
}