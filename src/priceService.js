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
exports.fetchPrices = fetchPrices;
exports.getCachedPrices = getCachedPrices;
// src/priceService.ts
const axios_1 = __importDefault(require("axios"));
const redisClient_1 = __importDefault(require("./redisClient"));
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';
function fetchPrices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(COINGECKO_API_URL);
            const prices = response.data;
            // Cache the prices in Redis for 1 minute
            yield redisClient_1.default.set('crypto_prices', JSON.stringify(prices), 'EX', 60);
            return prices;
        }
        catch (error) {
            console.error('Error fetching prices:', error);
            throw error;
        }
    });
}
function getCachedPrices() {
    return __awaiter(this, void 0, void 0, function* () {
        const cachedPrices = yield redisClient_1.default.get('crypto_prices');
        if (cachedPrices) {
            return JSON.parse(cachedPrices);
        }
        return yield fetchPrices();
    });
}
