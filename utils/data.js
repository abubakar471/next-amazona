import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: "Durjoy",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: true
        },
        {
            name: "User",
            email: "user@gmail.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: false
        }
    ],
    products: [
        {
            name: "Free Shirts",
            slug: "free-shirt",
            category: "Shirts",
            image: 'images/shirt1.jpg',
            price: 66,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "white premium t-shirt for man"
        },
        {
            name: "Fit Shirts",
            slug: "fit-shirt",
            category: "Shirts",
            image: 'images/shirt2.jpg',
            price: 89,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "white premium t-shirt for man"
        },
        {
            name: "Slim Shirts",
            slug: "slim-shirt",
            category: "Shirts",
            image: 'images/shirt3.jpg',
            price: 76,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "white premium t-shirt for man"
        },
        {
            name: "Premium Pants",
            slug: "premium-pants",
            category: "Pants",
            image: 'images/pant1.jpg',
            price: 45,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "white premium pant for man"
        },
        {
            name: "Black Pants",
            slug: "black-pants",
            category: "Pants",
            image: 'images/pant2.jpg',
            price: 45,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "Black premium pant for man"
        },
        {
            name: "Nice Pants",
            slug: "nice-pants",
            category: "Pants",
            image: 'images/pant3.jpg',
            price: 45,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "Nice premium pant for man"
        }

    ]
}

export default data