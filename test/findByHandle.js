"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const ds = require("../index");
function findByHandle() {
    return __awaiter(this, void 0, void 0, function* () {
        ds.setupServer({
            serverName: config_1.config.serverName
        });
        ds.setupSession({
            userName: config_1.config.userName,
            password: config_1.config.password
        });
        return yield ds.findByHandle("Collection-400");
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const dsObject = yield findByHandle();
    console.log(dsObject);
}))();
