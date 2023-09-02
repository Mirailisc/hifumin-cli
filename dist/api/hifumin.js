"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.exportYAML = exports.fetchApi = void 0;
const axios_1 = __importDefault(require("axios"));
const yaml_1 = __importDefault(require("yaml"));
const fs = __importStar(require("fs"));
const nanospinner_1 = require("nanospinner");
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const constants_1 = require("../config/constants");
const hifumin_1 = require("../gql/hifumin");
const axios_options_1 = require("../config/axios-options");
const utils_1 = require("../utils/utils");
const fetchApi = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let resData = null;
    try {
        const { data } = yield axios_1.default.post(constants_1.GQL_ENDPOINT, {
            query: hifumin_1.getPagesById,
            variables: {
                id,
            },
        }, {
            headers: axios_options_1.axiosOptions,
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
const exportYAML = (res, pageLimit) => __awaiter(void 0, void 0, void 0, function* () {
    const exportPath = constants_1.EXPORT_NH_PATH.replace('{id}', String(res.id)).toString() + '/' + constants_1.FILE_INFO_PATH;
    const spinner = (0, nanospinner_1.createSpinner)(ansi_colors_1.default.blueBright('Fetching')).start();
    yield (0, utils_1.sleep)();
    const apiJsonObject = {
        id: res.id,
        title: {
            english: res.title.english,
            japanese: res.title.japanese,
        },
        pageLimit: pageLimit !== null && pageLimit !== void 0 ? pageLimit : res.numPages,
        allPages: res.numPages,
        uploadDate: new Date(res.uploadDate * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            day: '2-digit',
            month: 'long',
        }),
        tags: res.tags.map((tag) => tag.name),
    };
    const yaml = yaml_1.default.stringify(apiJsonObject);
    try {
        fs.writeFileSync(exportPath, yaml);
        spinner.success({ text: ansi_colors_1.default.greenBright('Information generated (info.yaml)') });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
exports.exportYAML = exportYAML;
