import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

app.listen(port, () => console.log("Servidor rodando..."));
