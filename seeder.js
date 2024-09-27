import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported".green.inverse);
    process.exit(); // Exit the process
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany(); // Clear all users
    await Product.deleteMany(); // Clear all products

    console.log("Data destroyed".red.inverse);
    process.exit(); // Exit the process
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

// Check command-line arguments to determine if importing or destroying data
if (process.argv[2] === "-d") {
  destroyData(); // Destroy data if '-d' flag is present
} else {
  importData(); // Import data otherwise
}
