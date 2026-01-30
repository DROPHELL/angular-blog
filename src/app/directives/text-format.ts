import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[textFormat]',
  standalone: true
})
export class TextFormatDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('blur')
  onBlur(): void {
    const value = this.el.nativeElement.value;

    if (typeof value === 'string') {
      this.renderer.setProperty(
        this.el.nativeElement,
        'value',
        value.toLowerCase()
      );
    }
  }
}
