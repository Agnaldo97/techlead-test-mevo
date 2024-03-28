import { App } from "./application";
import { middleware } from "./middleware";
import { router } from "./routes/index";
import sequelize from './database/sequelize';

const PORT: number = 4000;

const app = new App(PORT, middleware, [router]);


sequelize.sync().then(() => {
    app.listen();
});