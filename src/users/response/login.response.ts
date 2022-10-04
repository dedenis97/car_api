import { UserEntity } from "../entity/user.entity";

export interface ILoginResponse{
    user: UserEntity,
    access_token: string
}