import { UserModel } from "./user.model";


export const stateName = 'user';
const prefix = '[' + stateName + ']';

export class LoadUsers {
    static readonly type = prefix + ' Load';
}

export class SaveUser {
    static readonly type = prefix + ' Save';

    constructor(public user: UserModel) {
        
    }
}