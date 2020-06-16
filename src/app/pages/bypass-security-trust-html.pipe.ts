import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'bypassSecurityTrustHtml'
})
export class BypassSecurityTrustHtmlPipe implements PipeTransform {

constructor(private domSanitizer: DomSanitizer) {}

  transform(html: any, type?: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {

    switch (type) {
      case 'html':
        return this.domSanitizer.bypassSecurityTrustHtml(html);
      case 'style':
        return this.domSanitizer.bypassSecurityTrustStyle(html);
      case 'script':
        return this.domSanitizer.bypassSecurityTrustScript(html);
      case 'url':
        return this.domSanitizer.bypassSecurityTrustUrl(html);
      case 'resourceUrl':
        return this.domSanitizer.bypassSecurityTrustResourceUrl(html);
      default:
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }


    // return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

}
