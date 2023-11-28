import app from "./app.js";
import { db } from "./db.js";

const port = 4000;


db();
app.listen(port, () => {
    console.log("server conectado en el puerto" + port);
})