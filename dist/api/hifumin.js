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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApi = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../config/constants");
const nh_1 = require("../gql/nh");
const axios_options_1 = require("../config/axios-options");
const fetchApi = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let resData = null;
    try {
        const { data } = yield axios_1.default.post(constants_1.GQL_ENDPOINT, {
            query: nh_1.getPagesById,
            variables: {
                id,
            },
        }, {
            headers: axios_options_1.options,
        });
        resData = yield data.data.nhentai.by;
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
    return resData;
});
exports.fetchApi = fetchApi;
