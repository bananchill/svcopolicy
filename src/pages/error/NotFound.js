export default class {
    name = 'notFound';
    #p_app = null;
    #p_log = null;

    install(_app){
        this.#p_app = _app
    }

    set log(_log) {
        this.#p_log = _log;
    }

    routes(_routes) {
        _routes.push({
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('./parts/NotFound.vue')
        });
    }
}
