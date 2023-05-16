import nc from "next-connect";
import Order from "@/models/Order";
import db from "@/utils/db";


const handler = nc();

handler.post(async (req, res) => {
    console.log(req.body)
    // checking for session to see whether the user is connected or not
    const session = req.body.session;

    console.log('mySession => ', session)
    if (!session) {
        console.log('session not found => ', session)
        return res.status(401).send('sign in required!');
    }

    // grabbing the user from the session, as it exist
    const { user } = session;
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: user._id
    })

    const order = await newOrder.save();
    console.log(order);
    res.status(201).send(order)
})


export default handler;