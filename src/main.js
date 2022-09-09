import * as Vue from "vue";

import Application from "./infrastructure/app/application";

import AppConfigurationProviderModule from "@/pages/appConfigurationProvider/appConfigurationProviderModule";
import TopLevelAppView from "@/pages/topLevel/topLevelAppView";

import User from "@/pages/user/User";
import NotFound from "@/pages/error/NotFound";
import Users from '@/pages/users/Users'

import ApiPack from "@/apis/apiPack";

import "./styles/total.scss"

// *********************************************************
// Setup version
// *********************************************************

window.Vue = Vue;
// ************************
// Creating application
// ************************

const app = new Application();

const appLogUngroup = app.log.groupCollapsed('configure');


app.use(new AppConfigurationProviderModule());


// ************************
// Installing modules
// ************************\

app.use(new ApiPack());

app.use(new TopLevelAppView())


app.use(new Users())
    .use(new User())
    .use(new NotFound());


appLogUngroup();
setTimeout(async () => await app.runAsync(), 0);
