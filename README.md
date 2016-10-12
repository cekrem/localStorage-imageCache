# localStorage-imageCache
Angular 2 directive for caching images in localStorage. Essentially makes all images available offline; perfect for hybrid apps that load external resources like avatars.

### Usage
Replace "src" or "[src]" (dynamic) with "cache" or "[cache]", like this:
<img cache="https://someurl.com/myimage.jpg" />
or <img [cache]="getMyUrl('myimage')" />

### What it does
* Saves image as Base64-string in localStorage (with the url as key)
* Loads cached version if present
* Failsafe 1: uses https://crossorigin.me proxy to avoid CORS issues when getting (if needed)
* Failsafe 2: if – for some unexplainable reason – image cannot be cached, the url will be used as src as a fallback
