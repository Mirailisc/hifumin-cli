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
exports.getImage = exports.getThumbnail = void 0;
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const cliProgress = __importStar(require("cli-progress"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const constants_1 = require("../config/constants");
const multiBar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: `{filename} | ${ansi_colors_1.default.cyan('{bar}')} | {percentage}%`,
}, cliProgress.Presets.legacy);
const getThumbnail = (id, mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const urlEndpoint = constants_1.NH_THUMBNAIL_URL.replace('{mediaId}', String(mediaId)).toString();
    const exportPath = constants_1.EXPORT_NH_PATH.replace('{id}', String(id)).toString() + '/';
    const progressBar = multiBar.create(1, 0);
    const res = yield axios_1.default.get(urlEndpoint, {
        responseType: 'stream',
        onDownloadProgress: ({ progress }) => {
            progressBar.start(1, 0);
            progressBar.increment();
            progressBar.update(progress, { filename: 'cover.jpg' });
        },
    });
    try {
        yield res.data.pipe(fs.createWriteStream(exportPath + constants_1.FILE_COVER_PATH));
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
exports.getThumbnail = getThumbnail;
const getImage = (id, mediaId, pages, limit) => {
    const maxPages = limit !== null && limit !== void 0 ? limit : pages.length;
    for (let i = 1; i <= maxPages; i++) {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const urlEndpoint = constants_1.NH_IMAGE_URL.replace('{mediaId}', String(mediaId)).replace('{page}', String(i)).toString();
            const fileImagePath = constants_1.FILE_IMAGE_PATH.replace('{page}', String(i)).toString();
            const exportPath = constants_1.EXPORT_NH_PATH.replace('{id}', String(id)).toString() + '/';
            const progressBar = multiBar.create(1, 0);
            const res = yield axios_1.default.get(urlEndpoint, {
                responseType: 'stream',
                onDownloadProgress: ({ progress }) => {
                    progressBar.start(1, 0);
                    progressBar.increment();
                    progressBar.update(progress, { filename: `${i}.jpg` });
                    multiBar.stop();
                },
            });
            try {
                yield res.data.pipe(fs.createWriteStream(exportPath + fileImagePath));
            }
            catch (err) {
                console.error(err);
                process.exit(1);
            }
        }), 1000 * i);
    }
};
exports.getImage = getImage;
