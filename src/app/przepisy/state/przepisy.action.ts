export const stateName = 'przepisy';
const prefix = '[' + stateName + ']';

export class LoadPrzepisy {
    static readonly type = '${prefix} Load';
}

export class SavePrzepisy {
    static readonly type = '${prefix} Save';

    constructor(public id: number) {
        
    }
}