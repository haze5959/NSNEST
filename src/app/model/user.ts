import { SafeStyle } from "@angular/platform-browser/src/security/dom_sanitization_service";

export class user {
    studentNum: number;
    name: string;
    image?: SafeStyle;
    intro?: string;
    description?: string;
    recentDate?: Date;
    subImage01?: string;
}