import { SafeStyle } from "@angular/platform-browser/src/security/dom_sanitization_service";

export class user {
    userId?: number;    //옵셔널하면 안됨!!
    studentNum: number;
    name: string;
    image?: SafeStyle;
    intro?: string;
    description?: string;
    recentDate?: Date;
    subImage01?: string;
}