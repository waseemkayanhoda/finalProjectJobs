export class ResetPassword {
    constructor(
        public email?: string,
        public oldPassword?: string,
        public newPassword?: string
    ) {}
}