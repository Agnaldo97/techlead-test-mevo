import { Application } from "express";
import express from "express";


export class App {
  public app: Application;

  constructor(
    private port: number,
    middleware: Array<any>,
    routes: Array<express.Router>
  ) {
    this.app = express();
    this.middleware(middleware);
    this.routes(routes);
  }

  private middleware(mware: any[]) {
    mware.forEach((m) => {
      this.app.use(m);
    });
  }


  public addMiddleWare(middleWare: any) {
    this.app.use(middleWare);
  }

  private routes(routes: Array<express.Router>) {
    routes.forEach((r) => {
      this.app.use(r);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Application running in port:", this.port);
    });
  }
}
