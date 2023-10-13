const { Expose } = require('class-transformer');

export class RegisterDTO {
    @Expose()
    username
    
    @Expose()
    password
    
    @Expose()
    email
}