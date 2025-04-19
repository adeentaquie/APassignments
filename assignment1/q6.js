// 1️⃣ Create a Customer Object
const customer = {
    firstName: "John",
    lastName: "Doe",
    address: {
        city: "New York",
        zipCode: "10001"
    },
    age: 30
};

const { firstName, lastName, address: { city } } = customer;

console.log(`Customer: ${firstName} ${lastName}, City: ${city}`);

const cart = [
    { item: "Laptop", price: 1000 },
    { item: "Phone", price: 600 },
    { item: "Headphones", price: 200 },
    { item: "Mouse", price: 50 }
];

const calculateTotalPrice = (...cartItems) => {
    return cartItems.reduce((total, item) => total + item.price, 0);
};
console.log("Total Price:", calculateTotalPrice(...cart));

const [firstItem, secondItem, ...remainingItems] = cart;

console.log("First Item:", firstItem);

console.log("Second Item:", secondItem);

console.log("Remaining Items:", remainingItems);
