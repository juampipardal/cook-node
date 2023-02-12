import { json } from "express";
import { JazeeraApp } from "jazeera";
import { ApiModule } from "./modules/api/api.module";

class App extends JazeeraApp {

    constructor() {
        super();
        this.config();
        this.addModules([ApiModule]);
        this.addStandaloneControllers([]);
        this.handleGlobalError();
    }


    private config(): void {
        this.app.use(json());
    }

    private handleGlobalError(): void {
        
        this.app.use((req, res, next) => {
            return res.status(500).send({ error: `URL: ${req.url} for method: ${req.method} does not exist.` });
        });
    }

}

export default new App().app;