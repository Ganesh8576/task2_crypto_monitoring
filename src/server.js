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
// src/server.ts
const express_1 = __importDefault(require("express"));
const priceService_1 = require("./priceService");
const aleartService_1 = require("./aleartService");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/set-alert', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, cryptocurrency, threshold } = req.body;
    yield (0, aleartService_1.setAlert)(userId, cryptocurrency, threshold);
    res.send('Alert set successfully');
}));
app.get('/prices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prices = yield (0, priceService_1.getCachedPrices)();
    res.json(prices);
}));
// Periodically fetch and update prices
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prices = yield (0, priceService_1.fetchPrices)();
        yield (0, aleartService_1.checkAlerts)(prices);
    }
    catch (error) {
        console.error('Error during periodic price update:', error);
    }
}), 60000); // Update every minute
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
