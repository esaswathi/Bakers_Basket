import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const GET_CART_ITEMS = gql`
  query GetCartItems($userId: ID!) {
    cartItems(userId: $userId) {
      id
      productId {
        id
        name
        description
        price
        image
      }
      quantity
      addedAt
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartItemId: ID!) {
    removeFromCart(cartItemId: $cartItemId) {
      id
    }
  }
`;

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = sessionStorage.getItem("userId");

  const { loading, error, data } = useQuery(GET_CART_ITEMS, {
    variables: { userId },
    skip: !userId,
    notifyOnNetworkStatusChange: true,
  });

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    update(cache, { data: { removeFromCart } }) {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
        variables: { userId },
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        variables: { userId },
        data: {
          cartItems: cartItems.filter((item) => item.id !== removeFromCart.id),
        },
      });
    },
  });

  React.useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await removeFromCart({ variables: { cartItemId } });
      alert("Item removed from cart!");
    } catch (err) {
      console.error("Error removing item from cart:", err);
      alert("Failed to remove item from cart");
    }
  };

  const getTotalAmount = () => {
    if (!data || !data.cartItems) return 0;
    return data.cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const handleProceedToCheckout = () => {
    if (!data || !data.cartItems) {
      console.log("No cart items available for checkout");
      return;
    }

    const items = data.cartItems
      .map((item) => {
        if (
          !item.productId ||
          !item.productId.id ||
          !item.productId.name ||
          !item.productId.vendorId ||
          !item.quantity ||
          !item.productId.price
        ) {
          console.log("Invalid cart item:", item);
          return null;
        }
        return {
          productId: item.productId.id,
          productName: item.productId.name,
          vendorId: item.productId.vendorId,
          quantity: item.quantity,
          totalPrice: item.productId.price * item.quantity,
        };
      })
      .filter((item) => item !== null);

    const totalAmount = getTotalAmount();

    console.log(
      "Proceeding to checkout with items:",
      items,
      "and total amount:",
      totalAmount
    );
    const checkoutId = "checkout";

    navigate(`/CartPurchase/${checkoutId}`, { state: { items, totalAmount } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching cart items:", error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div key={location.pathname}>
      <Navbar />
      <div className="container mt-5" id="contentSection">
        <h2 className="text-center display-4 mb-4">Your Cart</h2>
        
        {data.cartItems.length > 0 && (
          <div className="text-center mt-3 my-4">
            <h3>
              Total Amount: ${getTotalAmount().toFixed(2)}
              <button
                className="btn btn-warning my-2 ms-3"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </h3>
          </div>
        )}
        <div className="row my-5">
          {data.cartItems.length === 0 ? (
            <div className="col-12 text-center p-5 text-danger">
              <h5>Your cart is empty!</h5>
            </div>
          ) : (
            data.cartItems.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <img
                    src={item.productId.image}
                    className="card-img-top"
                    alt={item.productId.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.productId.name}</h5>
                    <p className="card-text">
                      Price: ${item.productId.price.toFixed(2)}
                    </p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <div className="mt-auto">
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mb-5">
          <p className="lead">
            You can browse more products and add to your cart to enjoy great
            deals!
            <button
              className="btn btn-warning m-2"
              onClick={() => navigate("/products")}
            >
              Add Items
            </button>
          </p>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
