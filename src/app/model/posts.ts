import { SafeStyle } from "@angular/platform-browser/src/security/dom_sanitization_service";

export class posts {
    postsID: number;
    studentNum: number;
    publisher: string;
    publisherIntro?: string;
    publisherImg: SafeStyle;
    images?: string[];
    title: string;
    body: string;
    good: number;
    bad: number;
}