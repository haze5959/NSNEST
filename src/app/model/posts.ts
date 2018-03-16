import { SafeStyle } from "@angular/platform-browser/src/security/dom_sanitization_service";
import { marker } from "./marker";

export class posts {
    postsID: number;
    postClassify: number;   //10:게시글, 20:앨범, 30:지도
    studentNum: number;
    publisher: string;
    publisherIntro?: string;
    publisherImg: SafeStyle;
    images?: string[];
    title: string;
    body: string;
    good: number;
    bad: number;
    commentId: Array<number>;
    marker?: marker;
    tag?: string;
}