import express from "express";
import { createUser, deleteUser, getAllUser, getOneUser, updateUser } from "../controller/userC.js";

const route = express.Router();

route.post("/create", createUser);
route.get("/getall", getAllUser);
route.get("/getone/:id", getOneUser);
route.put("/update/:id", updateUser);
route.delete("/delete/:id",deleteUser);


export default route;
