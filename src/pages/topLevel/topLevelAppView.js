import MainPage from "./parts/App"

export default class {
    name  = 'topLevel';
    #p_app = null;

    configure(_app) {
        _app.appView = MainPage;
        _app.mountNode = "#app";
    }


}
