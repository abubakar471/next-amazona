import nc from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import data from "@/utils/data";

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    // deleteMany function delete all the record from database that uses Product model 
    // we are doing this because we want to seed here
    await Product.deleteMany();
    // insertMany function adds data to the product model from an array
    await Product.insertMany(data.products);
    await db.disconnect();
    res.send({ message: "seeded successfully" });
});

export default handler