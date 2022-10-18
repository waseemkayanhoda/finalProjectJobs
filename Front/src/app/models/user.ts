import { PdfDocument } from "./pdf-document";
import { UserJobs } from "./user-jobs";

export class User {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public address?: string,
        public email?: string,
        public password?: string,
        public role?: string,
        public userJobs?: UserJobs[],
        public pdfDocuments?: PdfDocument[]
    ) { }
}