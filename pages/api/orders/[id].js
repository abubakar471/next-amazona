import nc from "next-connect";
const handler = nc();
import { getSession } from "next-auth/react"; 
import db from "@/utils/db";
import Order from "@/models/Order";

handler.get(async(req,res) => {
    const session = await getSession({req});
    if(!session){
        return res.statusCode(500).send("signin required")
    } 

    await db.connect();
    const order = await Order.findById(req.query.id);
    await db.disconnect();

    res.send(order);
});

export default handler