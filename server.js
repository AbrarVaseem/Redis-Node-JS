import express from "express";
import cors from "cors";
import friendsRouter from "./routes/FriendsRouter.js";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // If using frontend - CORS required

app.use("/", friendsRouter);

app.listen(PORT, () => {
    console.log('Started Application')
})