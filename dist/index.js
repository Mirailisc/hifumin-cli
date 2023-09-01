#!/usr/bin/env ts-node
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
const hifumin_1 = require("./api/hifumin");
const nhen_1 = require("./api/nhen");
const fs = __importStar(require("fs"));
const constants_1 = require("./config/constants");
const inquirer = __importStar(require("inquirer"));
const prompt_1 = require("./config/prompt");
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const run = (id, pageLimit) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, hifumin_1.fetchApi)(id);
    const exportPath = constants_1.EXPORT_NH_PATH.replace('{id}', String(res.id)).toString();
    if (!fs.existsSync(constants_1.EXPORT_DIR)) {
        fs.mkdirSync(constants_1.EXPORT_DIR);
    }
    if (fs.existsSync(exportPath)) {
        console.log('Doujin already exists');
        process.exit(1);
    }
    fs.mkdirSync(exportPath);
    yield (0, nhen_1.getThumbnail)(res.id, res.mediaId);
    yield (0, nhen_1.getImage)(res.id, res.mediaId, res.images.pages, pageLimit);
});
const prompt = inquirer.createPromptModule();
console.log(ansi_colors_1.default.magenta('Hifumin Cli'));
prompt(prompt_1.promptQuestions).then((answer) => {
    const id = parseInt(answer.id);
    const pageLimit = answer.limitPage ? parseInt(answer.limitPage) : null;
    run(id, pageLimit);
});
