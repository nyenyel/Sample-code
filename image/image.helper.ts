export class ImageHelper{
    getPathnameFromBlobUrl(url: string): string {
        const parsed = new URL(url);
        return parsed.pathname.slice(1);
    }
}