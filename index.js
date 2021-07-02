"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var app = express_1.default();
dotenv_1.default.config();
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
var calculateDogYears = function (dogAge) {
    return dogAge * 7;
};
var convertToHumanFromDog = function (humanAge) {
    return humanAge / 7;
};
app.post('/api/dog-to-human', function (req, res) {
    if (typeof req.body.age === "number") {
        res.json({
            status: 'OK',
            age: calculateDogYears(req.body.age)
        });
    }
    else {
        res.status(400).json({
            status: 'User error',
            message: 'Input must be a number'
        });
    }
});
app.post('/api/human-to-dog', function (req, res) {
    if (typeof req.body.age === "number") {
        res.json({
            status: 'OK',
            age: convertToHumanFromDog(req.body.age)
        });
    }
    else {
        res.status(400).json({
            status: 'User error',
            message: 'Input must be a number'
        });
    }
});
var port = Number.parseInt(process.env.PORT) || 3000;
app.listen(port, function () {
    console.log("Listening on http://localhost:" + port);
});
