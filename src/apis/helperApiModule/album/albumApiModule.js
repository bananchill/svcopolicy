/* eslint max-classes-per-file: ["error", 2] */

import Adapter from "@/apis/toolkit/Adapter";

import {transformAlbum} from '@/infrastructure/helper/transformation/transformatioin'

class AlbumApiImpl {
    name = 'albums';

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
        log.i(`using albumApiModule`)
        this.#p_Adapter = new Adapter(log)
    }

    async getAlbumByUserAsync(_userId) {
        const userId = parseInt(_userId, 10)
        let album = await this.#p_Adapter.requestJsonAsync({
            method: 'GET',
            query: `${this.name}?userId=` + userId,
            operationDescription: `get the user album`,
        });
        album = transformAlbum(album)
        return album;
    }

}

export default class AlbumApiModule {
    name = 'album-api';

    #pLog = null;

    set log(_log) {
        this.#pLog = _log;
    }

    install(_app) {
        _app.interfaces.register('albumApi', () => {
            const api = new AlbumApiImpl(this.#pLog, _app.adapter);
            api.init();
            return api;
        });

    }
}
