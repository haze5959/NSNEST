import { SafeStyle } from "@angular/platform-browser/src/security/dom_sanitization_service";

export class postImage {
    studentNum: number;
    name: string;
    profileImage: SafeStyle;
    intro?: string;
    description?: string;
    recentDate?: Date;
    image?: string;
}