/* eslint max-classes-per-file: ["error", 3] */

import Stopwatch from "@/infrastructure/toolkit/stopwatch";

class FetchApiError extends Error {
    constructor(_message) {
        super(_message)
        this.name = 'FetchApiError'
    }
}


export default class Adapter {
    static instance;
    name = 'adapter'

    #pLog = null

    #p_URL = process.env.VUE_APP_ENV_GLOBAL_LINK

    constructor(log) {
        this.#pLog = log
        Adapter.getInstance()
        return this
    }

    static getInstance() {
        if (!Adapter.instance) {
            Adapter.instance = this
        }
        return Adapter.instance
    }

    requestIgnoreResponseDataAsync(_data) {
        return this.requestAsync(_data, null)
    }

    requestJsonAsync(_data) {
        return this.requestAsync(_data, _response => _response.json());
    }

    async requestAsync(_data, _resolvePayloadAsync) {
        const stopwatch = Stopwatch.start()
        const log = this.#pLog

        const {
            method,
            query,
            body,
            headers,
            operationDescription,
        } = _data

        log.i(`**${method}** ${operationDescription}  ...`);
        let response;

        let request = {method};
        if (method === 'POST') {
            request = {method: method, body: JSON.stringify(body), headers}
        }
        try {
            response = await window.fetch(this.#p_URL + query, request)

        } catch (_e) {
            const msg = `Fail: ${operationDescription} ${stopwatch.getDiff()} ms: ${_e}`
            log.w(msg);
            throw new FetchApiError(msg)
        }


        if (!response.ok) {
            const msg = `${method} '${operationDescription}' failed, status ${response.status} / ${response.statusText}`;
            log.w(msg);
            throw new FetchApiError(`Error: ${msg}`)
        }

        if (_resolvePayloadAsync === null)
            return response.ok;

        log.i(`${operationDescription} ${stopwatch.getDiff()} start parsing ms`)
        const data = await _resolvePayloadAsync(response)
        log.i(`Success: ${operationDescription} ${stopwatch.getDiff()} parsed ms`)

        return data
    }

}
