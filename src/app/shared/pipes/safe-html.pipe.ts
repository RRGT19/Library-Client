import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Angular comes with a built-in html sanitizer DomSanitizer, as a security feature,
 * that is used whenever you use [innerHtml] to show HTML content.
 * To avoid issues with custom styles (for example inline styles), we need to disable DOMSanitizer.
 */

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  public transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
