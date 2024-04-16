import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { IsNullable } from '../../decorators/isNullable.decorator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNullable()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  artistId: string | null;

  @IsNullable()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  albumId: string | null;

  @IsInt()
  duration: number;
}
