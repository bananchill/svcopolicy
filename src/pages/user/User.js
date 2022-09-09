import User from "@/pages/user/parts/User.vue";
import UserComp from "@/components/user/User.vue";

export default class {
    name = 'user';
    #p_app = null;
    #p_log = null;

    install(_app) {
        this.#p_app = _app;
    }

    set log(_log) {
        this.#p_log = _log;
    }

    routes(_routes) {
        _routes.push({
            path: '/user',
            name: 'userPage',
            component: User,
            children: [
                {
                    path: ':id',
                    name:'user',
                    component: UserComp
                },
                {
                    path: '/user/*',
                    redirect: {
                        name: 'notFound'
                    },

                },

            ],
            props: true,
            sensitive: true
        });
    }
}
