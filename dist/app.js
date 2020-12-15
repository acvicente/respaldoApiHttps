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
var fs = require("fs");
var https = require("https");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const pedido_routes_1 = __importDefault(require("./routes/pedido.routes"));
const administracion_routes_1 = __importDefault(require("./routes/administracion.routes"));
const imagenesBanner_routes_1 = __importDefault(require("./routes/imagenesBanner.routes"));
const informacion_routes_1 = __importDefault(require("./routes/informacion.routes"));
const pedido_detalle_routes_1 = __importDefault(require("./routes/pedido-detalle.routes"));
const configuracion_routes_1 = __importDefault(require("./routes/configuracion.routes"));
const promociones_routes_1 = __importDefault(require("./routes/promociones.routes"));
const enviarEmailPedido_routes_1 = __importDefault(require("./routes/enviarEmailPedido.routes"));
const correoSoporte_routes_1 = __importDefault(require("./routes/correoSoporte.routes"));
const pedidoEmpresa_routes_1 = __importDefault(require("./routes/pedidoEmpresa.routes"));
const pasarela_pago_routes_1 = __importDefault(require("./routes/pasarela-pago.routes"));
class App {
    // = https.createServer(this.credentials, this.app1);
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        // public app1 = express();
        this.privateKey = fs.readFileSync(__dirname + "/sslcert/cert.key", "utf8");
        this.certificate = fs.readFileSync("/etc/ssl/certs/mastudioshoes_com.crt", "utf8");
        this.credentials = { key: this.privateKey, cert: this.certificate };
        // this.app = express();
        // this.settings();
        this.crearHttps();
        this.middleware();
        this.routes();
    }
    // settings() {
    //   this.app.set("port", this.port || process.env.PORT || 3005);
    // }
    crearHttps() {
        this.httpsServer = https.createServer(this.credentials, this.app);
    }
    middleware() {
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        //Permitir CORS
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
            next();
        });
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use("/pedidos", pedido_routes_1.default);
        this.app.use("/administracions", administracion_routes_1.default);
        this.app.use("/imagenes-banners", imagenesBanner_routes_1.default);
        this.app.use("/informacions", informacion_routes_1.default);
        this.app.use("/pedidos-detalles", pedido_detalle_routes_1.default);
        this.app.use("/configuracion", configuracion_routes_1.default);
        this.app.use("/promociones", promociones_routes_1.default);
        this.app.use("/enviarCorreo", enviarEmailPedido_routes_1.default);
        this.app.use("/correoSoporte", correoSoporte_routes_1.default);
        this.app.use("/pedidosEmpresa", pedidoEmpresa_routes_1.default);
        this.app.use('/pasarelaPago', pasarela_pago_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.app.listen(this.app.get('port'));
            // console.log("Server on port", this.app.get('port'));
            try {
                this.httpsServer.listen(8444);
                console.log("AQUI");
            }
            catch (e) {
                console.log(e);
            }
            // this.httpsServer.listen(8443);
            // console.log("Indica la copia mi ñaño");
        });
    }
}
exports.App = App;
