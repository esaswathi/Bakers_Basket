const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Mongoose setup
mongoose.connect('mongodb+srv://esaswathy161195:Aswathi3468@cluster0.g6kor4u.mongodb.net/bakersbasket?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Models
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  role: String
});

const LoginInfo = mongoose.model('LoginInfo', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    required: true
  },
});

const Product = mongoose.model('Product', {
  name: String,
  description: String,
  price: Number,
  stocks: Number,
  category: String,
  image: String,
  zipCode: String,
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const Cart = mongoose.model('Cart', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
});
const PurchaseSchema = mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  cardDetails: {
    type: String,
    required: true
  },
  totalAmount: {  
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
    required: true
  },
  quantity: {  
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
    required: true
  },
});
const Purchase = mongoose.model('Purchase', PurchaseSchema);

const Wishlist = mongoose.model('Wishlist', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// GraphQL Schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    stocks: Int!
    category: String!
    image: String!
    zipCode: String!
    vendorId: ID!
  }

  type Cart {
    id: ID!
    userId: ID!
    productId: Product!
    vendorId: ID!
    quantity: Int!
    addedAt: String!
  }
type Purchase {
  id: ID!
  address: String!
  cardDetails: String!
  totalAmount: Float!
  productId: ID!        
  productName: String!  
  vendorId: ID!          
  purchaseDate: String! 
  quantity:Int!
  status:String!
  userId: ID!
}
  type SalesReport {
  productName: String!
  totalSales: Float!
}
  type WishlistItem {
  id: ID!
  userId: ID!
  productId: Product
}

  type Query {
    hello: String
    products: [Product]
    product(id: ID!): Product
    productsByVendor(vendorId: ID!): [Product]
    cartItems(userId: ID!): [Cart]
    productsByZipCode(zipCode: String!): [Product]
    users: [User]
    ordersByVendor(vendorId: ID!): [Purchase]
    ordersByUser(userId: ID!): [Purchase]
    salesReport: [SalesReport]
     wishlistItems(userId: ID!): [WishlistItem]
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!, role: String!): User
    loginUser(email: String!, password: String!): LoginResponse
    addProduct(name: String!, description: String!, price: Float!, stocks: Int!, category: String!, image: String!, zipCode: String!, vendorId: ID!): Product
    deleteProduct(id: ID!): Product
    updateProduct(id: ID!, name: String!, description: String!, price: Float!, stocks: Int!, category: String!, image: String!, zipCode: String!): Product
    addToCart(userId: ID!, productId: ID!, vendorId: ID!, quantity: Int!): Cart
    removeFromCart(cartItemId: ID!): Cart
    deleteUser(id: ID!): User
    confirmPurchase(
  address: String!,
  cardDetails: String!,
  totalAmount: Float!,
  productId: ID!,
  productName: String!,
  vendorId: ID!,
  quantity: Int!,
  status:String!,
  userId: ID!
): Purchase
updateOrderStatus(orderId: ID!, status: String!): Purchase
 addToWishlist(userId: ID!, productId: ID!): WishlistItem
 removeFromWishlist(userId: ID!, productId: ID!): WishlistItem
 checkoutCart(userId: ID!, address: String!, cardDetails: String!, status: String!): [Purchase]
}
`;

// Resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    products: async () => {
      try {
        return await Product.find();
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
    product: async (_, { id }) => {
      try {
        const product = await Product.findById(id);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      } catch (error) {
        throw new Error('Error fetching product');
      }
    },
    productsByVendor: async (_, { vendorId }) => {
      try {
        return await Product.find({ vendorId });
      } catch (error) {
        throw new Error('Error fetching products by vendor');
      }
    },
    productsByZipCode: async (_, { zipCode }) => {
      try {
        return await Product.find({ zipCode });
      } catch (error) {
        throw new Error('Error fetching products by ZIP code');
      }
    },
    cartItems: async (_, { userId }) => {
      try {
        return await Cart.find({ userId }).populate('productId'); // Populate product details
      } catch (error) {
        throw new Error('Error fetching cart items');
      }
    },
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    ordersByVendor: async (_, { vendorId }) => {
      try {
        return await Purchase.find({ vendorId });
      } catch (error) {
        throw new Error('Error fetching orders by vendor');
      }
    },
    ordersByUser: async (_, { userId }) => {
      try {
        return await Purchase.find({ userId });
      } catch (error) {
        throw new Error('Error fetching orders by vendor');
      }
    },
    wishlistItems: async (_, { userId }) => {
      try {
        return await Wishlist.find({ userId }).populate('productId');
      } catch (error) {
        throw new Error('Error fetching wishlist items');
      }
    },
    salesReport: async () => {
      try {
        const purchases = await Purchase.aggregate([
          {
            $group: {
              _id: "$productName",
              totalSales: { $sum: "$totalAmount" },
            },
          },
          {
            $project: {
              _id: 0,
              productName: "$_id",
              totalSales: 1,
            },
          },
        ]);
        return purchases;
      } catch (error) {
        throw new Error('Error fetching sales report');
      }
    },
  },

  Mutation: {
    registerUser: async (_, { username, email, password, role }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists with this email');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        const loginInfo = new LoginInfo({ userId: newUser._id, email: newUser.email, role });
        await loginInfo.save();

        return newUser;
      } catch (error) {
        throw new Error('Error registering user');
      }
    },
    checkoutCart: async (_, { userId, address, cardDetails, status }) => {
      try {
        const cartItems = await Cart.find({ userId }).populate('productId');

        if (!cartItems.length) {
          throw new Error('No items in cart');
        }

        const purchases = [];
        let totalAmount = 0;

        for (const cartItem of cartItems) {
          const purchase = new Purchase({
            address,
            cardDetails,
            totalAmount: cartItem.productId.price * cartItem.quantity,
            productId: cartItem.productId._id,
            productName: cartItem.productId.name,
            vendorId: cartItem.vendorId,
            quantity: cartItem.quantity,
            status,
            userId,
            purchaseDate: new Date(),
          });

          totalAmount += purchase.totalAmount;

          await purchase.save();

          const product = await Product.findById(cartItem.productId._id);
          product.stocks -= cartItem.quantity;

          if (product.stocks < 0) {
            throw new Error('Insufficient stock');
          }

          await product.save();
          purchases.push(purchase);
        }

        await Cart.deleteMany({ userId });

        return purchases;
      } catch (error) {
        console.error('Error during checkout:', error.message);
        throw new Error('Error during checkout');
      }
    },
    loginUser: async (_, { email, password }) => {
      try {
        // Hardcoded admin credentials
        const adminEmail = 'Admin@gmail.com';
        const adminPassword = 'Admin123';

        if (email === adminEmail && password === adminPassword) {
          const token = jwt.sign({ email, role: 'admin' }, 'your-secret-key', { expiresIn: '1h' });
          return {
            token,
            user: {
              id: 'admin-id',
              username: 'Admin',
              email,
              role: 'admin',
            },
          };
        }

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Incorrect password');
        }

        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error('Error logging in');
      }
    },
    addProduct: async (_, { name, description, price, stocks, category, image, zipCode, vendorId }) => {
      try {
        const vendor = await User.findById(vendorId);
        if (!vendor) {
          throw new Error('Vendor not found');
        }

        const newProduct = new Product({ name, description, price, stocks, category, image, zipCode, vendorId });
        await newProduct.save();
        return newProduct;
      } catch (error) {
        throw new Error('Error adding product');
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          throw new Error('Product not found');
        }
        return deletedProduct;
      } catch (error) {
        throw new Error('Error deleting product');
      }
    },
    updateProduct: async (_, { id, name, description, price, stocks, category, image, zipCode }) => {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { name, description, price, stocks, category, image, zipCode },
          { new: true },
        );
        if (!updatedProduct) {
          throw new Error('Product not found');
        }
        return updatedProduct;
      } catch (error) {
        throw new Error('Error updating product');
      }
    },
    addToCart: async (_, { userId, productId, vendorId, quantity }) => {
      try {
        const product = await Product.findById(productId);
        if (!product) {
          throw new Error('Product not found');
        }

        const cartItem = new Cart({
          userId,
          productId,
          vendorId,
          quantity
        });
        await cartItem.save();
        return cartItem;
      } catch (error) {
        throw new Error('Error adding product to cart');
      }
    },
    removeFromCart: async (_, { cartItemId }) => {
      try {
        const removedCartItem = await Cart.findByIdAndDelete(cartItemId);
        if (!removedCartItem) {
          throw new Error('Cart item not found');
        }
        return removedCartItem;
      } catch (error) {
        throw new Error('Error removing item from cart');
      }
    },
    removeFromWishlist: async (_, { userId, productId }) => {
      try {
        const removedItem = await Wishlist.findOneAndDelete({ userId, productId });
    
        if (!removedItem) {
          throw new Error('Wishlist item not found');
        }
    
        return {
          id: removedItem._id.toString(),
          userId: removedItem.userId,
          productId: removedItem.productId,
          __typename: "WishlistItem"
        };
      } catch (error) {
        console.error("Error removing product from wishlist:", error);
        throw new ApolloError("Failed to remove product from wishlist", error);
      }
    },
    
    
    confirmPurchase: async (_, { address, cardDetails, totalAmount, productId, productName, vendorId, quantity,status,userId }) => {
      try {
        // Create a new purchase record
        const purchase = new Purchase({
          address,
          cardDetails,
          totalAmount,
          productId,
          productName,
          vendorId,
          quantity,
          status,
          userId,
          purchaseDate: new Date(),
        });

        // Save the purchase record
        await purchase.save();

        // Update the product's stock
        const product = await Product.findById(productId);
        if (!product) {
          throw new Error('Product not found');
        }

        // Decrement the product stock
        product.stocks -= quantity;

        // Check if the updated stock is valid
        if (product.stocks < 0) {
          throw new Error('Insufficient stock');
        }

        // Save the updated product
        await product.save();

        console.log('Purchase saved successfully:', purchase);
        console.log('Product stock updated successfully:', product);

        // Return the saved purchase object
        return purchase;
      } catch (error) {
        // Log and handle any errors that occur during the save operation
        console.error('Error saving purchase:', error.message);
        throw new Error('Error saving purchase');
      }
    },
    addToWishlist: async (_, { userId, productId }) => {
      try {
        // Check if the item already exists in the wishlist
        const existingWishlistItem = await Wishlist.findOne({ userId, productId });

        if (existingWishlistItem) {
          throw new Error('Item already in wishlist');
        }

        // Create a new wishlist item
        const wishlistItem = new Wishlist({
          userId,
          productId
        });

        await wishlistItem.save();

        return wishlistItem;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateOrderStatus: async (_, { orderId, status }) => {
      try {
        const updatedOrder = await Purchase.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
          throw new Error('Order not found');
        }
        return updatedOrder;
      } catch (error) {
        throw new Error('Error updating order status');
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error('User not found');
        }
        return deletedUser;
      } catch (error) {
        throw new Error('Error deleting user');
      }
    },
  },
  
  Cart: {
    productId: async (cartItem) => {
      try {
        return await Product.findById(cartItem.productId);
      } catch (error) {
        throw new Error('Error fetching product');
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
