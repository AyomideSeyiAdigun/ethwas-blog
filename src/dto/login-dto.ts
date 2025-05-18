export   class   LoginDto {
email!:string;
password!:string

}

export class RegisterDto extends LoginDto{
 firstName!:string;
 lastName!:string;
 id!:number;
}
