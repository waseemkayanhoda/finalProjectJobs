export class PdfDocument {
    constructor(
        public id?: number,
        public name?: string,
        public filename?: string,
        public content?: string,
        public contentType?: string,
        public created?: Date
    ) { }
}