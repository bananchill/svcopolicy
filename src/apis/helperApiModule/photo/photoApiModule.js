/* eslint max-classes-per-file: ["error", 2] */

import Adapter from "@/apis/toolkit/Adapter";

import {transformPhoto} from '@/infrastructure/helper/transformation/transformatioin'

class PhotoApiImpl {
    name = 'photos';

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
        log.i(`using photoApiModule`)
        this.#p_Adapter = new Adapter(log)
    }

    async getInfoAsync(_album) {
        let album = {};
        const photo = await this.#p_Adapter.requestJsonAsync({
            method: 'GET',
            query: this.name,
            operationDescription: `get ${this.name}`,
        });
        album = transformPhoto(photo, _album);
        return album;
    }
}

export default class PhotoApiModule {
    name = 'photo-api';

    #pLog = null;

    set log(_log) {
        this.#pLog = _log;
    }

    install(_app) {
        _app.interfaces.register('photoApi', () => {
            const api = new PhotoApiImpl(this.#pLog, _app.adapter);
            api.init();
            return api;
        });
    }
}
