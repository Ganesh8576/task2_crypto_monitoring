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
exports.setAlert = setAlert;
exports.checkAlerts = checkAlerts;
// alertService
const mongodbClient_1 = require("./mongodbClient");
function setAlert(userId, cryptocurrency, threshold) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, mongodbClient_1.connectDB)();
        const alerts = db.collection('alerts');
        yield alerts.insertOne({ userId, cryptocurrency, threshold });
    });
}
function checkAlerts(prices) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, mongodbClient_1.connectDB)();
        const alerts = db.collection('alerts');
        const alertsToTrigger = yield alerts.find().toArray();
        alertsToTrigger.forEach(alert => {
            var _a;
            const currentPrice = (_a = prices[alert.cryptocurrency]) === null || _a === void 0 ? void 0 : _a.usd;
            if (currentPrice && currentPrice >= alert.threshold) {
                console.log(`Alert for user ${alert.userId}: ${alert.cryptocurrency} price is ${currentPrice}`);
                // Send alert to the user
            }
        });
    });
}
