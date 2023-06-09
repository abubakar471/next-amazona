import nc from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
});

export default handler