import { ApiProperty } from "@nestjs/swagger";

export class UserSignInDto {
    @ApiProperty()
    email_or_phone: string
    @ApiProperty()
    mat_khau: string
}
