import { Selector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";
import { UserModel } from "./user.model";


export class UserSelector {
    @Selector([UserState])
    static getUser(state: UserStateModel): UserModel[] {
        return state.users;
    }
}
