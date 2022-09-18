/* eslint max-classes-per-file: ["error", 2] */

import Adapter from "@/apis/toolkit/Adapter";

import {transformComment} from '@/infrastructure/helper/transformation/transformatioin'
class CommentApiImpl {
    name = 'comments';

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
        log.i(`using commentApiModule`)
        this.#p_Adapter = new Adapter(log)
    }

    async getInfoAsync(_posts) {
        console.log(this.#p_Adapter)
        const comments = await this.#p_Adapter.requestJsonAsync({
            method: 'GET',
            query: this.name ,
            operationDescription: `get comments`,
        });
        let posts = transformComment( _posts, comments);
        return posts
    }


}

export default class CommentApiModule {
    name = 'post-api';

    #pLog = null;

    set log(_log) {
        this.#pLog = _log;
    }

    install(_app) {
        _app.interfaces.register('commentApi', () => {
            const api = new CommentApiImpl(this.#pLog, _app.adapter);
            api.init();
            return api;
        });

    }
}
