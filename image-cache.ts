import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[cache]'
})
export class ImageCacheDirective implements AfterViewInit {
    @Input() cache: string;

    constructor(public el: ElementRef) { }

    ngAfterViewInit() {
        console.log('Trying to cache image: ', this.cache);
        this.el.nativeElement.crossOrigin = null; // CORS enabling
        let cache = localStorage.getItem(this.cache);

        if (cache) {
            console.log('Already cached! Using cache...');
            this.el.nativeElement.src = cache;
        }
        else {
            console.log('Not cached! Caching ' + this.cache);
            this.cacheImage();
        }
    }

    cacheImage(proxy: boolean = false) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
            let reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem(this.cache, reader.result);
                this.el.nativeElement.src = reader.result;
            }
            reader.readAsDataURL(xhr.response);
        };

        xhr.onerror = (error) => {
            console.warn(error, 'trying with proxy...')
            if(!proxy) {
                this.cacheImage(true);
            }
            else {
                console.error('Giving up cache, setting src to url!');
                this.el.nativeElement.src = this.cache;
            }
        }
        
        let url = this.cache;
        if (proxy) {
            url = 'https://crossorigin.me/' + url;
        }

        xhr.open('GET', url);
        xhr.send();
    }
}