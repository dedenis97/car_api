import { Expose } from "class-transformer";

// UserResponseDto
export class UserDto{
    
    @Expose()
    id: number;
    
    @Expose()
    email: string;
    
}