/* eslint max-classes-per-file: ["error", 2] */

import Adapter from "@/apis/toolkit/Adapter";

import {transformPost} from '@/infrastructure/helper/transformation/transformatioin'

class PostApiImpl {
    name = 'posts';

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
        log.i(`using postApiModule`)
        this.#p_Adapter = new Adapter(log)
    }

    async getInfoAsync(_userId) {
        const userId = parseInt(_userId, 10)
        let posts = await this.#p_Adapter.requestJsonAsync({
            method: 'GET',
            query: this.name + '?userId=' + userId,
            operationDescription: `get posts by id user`,
        })

        posts = transformPost(posts);
        return posts
    }

    async createPostAsync( body) {
        let res = await this.#p_Adapter.requestIgnoreResponseDataAsync({
            method: 'POST',
            query: this.name ,
            body: body,
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
            operationDescription: `create post by id user`,
        })

        return res
    }

}

export default class PostApiModule {
    name = 'post-api';

    #pLog = null;

    set log(_log) {
        this.#pLog = _log;
    }

    install(_app) {
        _app.interfaces.register('postApi', () => {
            const api = new PostApiImpl(this.#pLog, _app.adapter);
            api.init();
            return api;
        });

    }
}
