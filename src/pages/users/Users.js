import Users from "@/pages/users/parts/Users.vue";

export default class {
    name  = 'users';
    #p_app = null;
    #p_log = null;

    install(_app) {
        this.#p_app = _app;
    }

    set log(_log) {
        this.#p_log = _log;
    }
    routes(_routes){
        _routes.push({
            path: '/',
            name: 'Users',
            component: Users,
            props: true,
        })
    }
}
