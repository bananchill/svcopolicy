/* eslint max-classes-per-file: ["error", 2] */

import Adapter from "@/apis/toolkit/Adapter";

class UsersApiImpl {
    name = 'users';

    #p_Adapter = null;

    #p_Log = null;


    constructor(_log) {
        this.#p_Log = _log;
    }

    set log(_log) {
        this.#p_Log = _log;
    }

    init() {
        const log = this.#p_Log;
        log.i(`using userApiModule`)
        this.#p_Adapter = new Adapter(log)
    }

    async getAllAsync() {
        return await this.#p_Adapter.requestJsonAsync({
            method: 'GET',
            query: this.name,
            operationDescription: `get users`,
        });
    }

    async getInfoAsync(_userId) {
        const userId = parseInt(_userId, 10)
        return await this.#p_Adapter.requestJsonAsync({
            method: 'GET',
            query: this.name + '/' + userId,
            operationDescription: `get user by id `,
        });
    }

}

export default class UserApiModule {
    name = 'user-api';

    #pLog = null;

    set log(_log) {
        this.#pLog = _log;
    }

    install(_app) {
        _app.interfaces.register('userApi', () => {
            const api = new UsersApiImpl(this.#pLog, _app.adapter);
            api.init();
            return api;
        });

    }
}
