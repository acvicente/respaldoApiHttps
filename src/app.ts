var fs = require("fs");
var https = require("https");
import express, { Application } from "express";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes";
import pedido from "./routes/pedido.routes";
import administracion from "./routes/administracion.routes";
import imagenesBanner from "./routes/imagenesBanner.routes";
import informacion from "./routes/informacion.routes";
import pedidosDetalle from "./routes/pedido-detalle.routes";
import configuracion from "./routes/configuracion.routes";
import promociones from "./routes/promociones.routes";
import enviarCorreo from "./routes/enviarEmailPedido.routes";
import correoSoporte from "./routes/correoSoporte.routes";
import pedidoEmpresa from "./routes/pedidoEmpresa.routes";
import pasarelaPago from './routes/pasarela-pago.routes';

export class App {
  private app = express();

  // public app1 = express();

  public privateKey = fs.readFileSync(__dirname + "/sslcert/cert.key", "utf8");
  public certificate = fs.readFileSync(
    "/etc/ssl/certs/mastudioshoes_com.crt",
    "utf8"
  );
  public credentials = { key: this.privateKey, cert: this.certificate };
  public httpsServer: any;
  // = https.createServer(this.credentials, this.app1);

  constructor(private port?: number | string) {
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
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    //Permitir CORS
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS"
      );
      next();
    });
  }

  routes() {
    this.app.use(indexRoutes);
    this.app.use("/pedidos", pedido);
    this.app.use("/administracions", administracion);
    this.app.use("/imagenes-banners", imagenesBanner);
    this.app.use("/informacions", informacion);
    this.app.use("/pedidos-detalles", pedidosDetalle);
    this.app.use("/configuracion", configuracion);
    this.app.use("/promociones", promociones);
    this.app.use("/enviarCorreo", enviarCorreo);
    this.app.use("/correoSoporte", correoSoporte);
    this.app.use("/pedidosEmpresa", pedidoEmpresa);
    this.app.use('/pasarelaPago', pasarelaPago);
  }

  async listen() {
    // await this.app.listen(this.app.get('port'));
    // console.log("Server on port", this.app.get('port'));
    try {
      this.httpsServer.listen(8444);
      console.log("AQUI");
    } catch (e) {
      console.log(e);
    }

    // this.httpsServer.listen(8443);
    // console.log("Indica la copia mi ñaño");
  }
}
