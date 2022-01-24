"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: true
}));
app.get('/*', function (req, res) {
    res.send('Ah ah ah, you didn\'t say the magic word\n' + req.path);
});
https_1.default
    .createServer({
    key: fs_1.default.readFileSync("../key.pem"),
    cert: fs_1.default.readFileSync("../cert.pem"),
}, app)
    .listen(32168, function () {
    console.log("Listening on port 32168");
});
exports.default = app;
//# sourceMappingURL=app.js.map