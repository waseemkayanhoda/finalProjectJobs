export class JobObject {
    constructor(
        public id: number,
        public jobTitle: string,
        public salary: string,
        public location: string,
        public contractType: string,
        public jobDescription: string,
        public companyType: string,
        public jobType: string,
    ) { }
}