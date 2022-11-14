import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersDto {
  @ApiProperty()
  @IsNotEmpty()
  coin: number;
}