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
exports.connectDB = connectDB;
// src/mongodbClient.ts
const mongodb_1 = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(url);
const dbName = 'cryptoMonitoring';
let db;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db) {
            yield client.connect();
            db = client.db(dbName);
        }
        return db;
    });
}
