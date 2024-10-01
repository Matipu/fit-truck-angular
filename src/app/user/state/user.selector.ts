import { Selector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";
import { User } from "./user.model";


export class UserSelector {
    @Selector([UserState])
    static getUser(state: UserStateModel): User[] {
        return state.users;
    }
}