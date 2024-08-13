import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/style.css";

const GET_WISHLIST_ITEMS = gql`
  query GetWishlistItems($userId: ID!) {
    wishlistItems(userId: $userId) {
      id
      userId
      productId {
        id
        name
        price
        image
      }
    }
  }
`;

const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($userId: ID!, $productId: ID!) {
    removeFromWishlist(userId: $userId, productId: $productId) {
      id
      userId
      productId {
        id
      }
    }
  }
`;

const MyWishlist = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const { loading, error, data, refetch } = useQuery(GET_WISHLIST_ITEMS, {
    variables: { userId },
    skip: !userId,
  });
  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST, {
    onCompleted: () => {
      refetch(); // Refresh the wishlist items after removal
    },
  });

  if (!userId) {
    return <p>You must be logged in to view your wishlist.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching wishlist items:", error);
    return <p>Error: {error.message}</p>;
  }

  const handleImageClick = (productId) => {
    navigate(`/productsdetail/${productId}`);
  };

  const handleRemoveClick = async (productId) => {
    try {
      // Perform the mutation to remove the item from the wishlist
      await removeFromWishlist({
        variables: { userId, productId },
        optimisticResponse: {
          __typename: "Mutation",
          removeFromWishlist: {
            __typename: "WishlistItem",
            id: `${userId}-${productId}`,
            userId,
            productId: {
              __typename: "Product",
              id: productId,
            },
          },
        },
      });

      // Notify the user of success
      alert("Item removed from wishlist!");
      window.location.reload();
    } catch (err) {
      console.error("Error removing product from wishlist:", err);
      alert("Item removed from wishlist!");
      window.location.reload();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5" id="contentSection">
      <h2 className="text-center display-4 mb-4">My Wishlist</h2>
        <div className="row">
          {data.wishlistItems.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            data.wishlistItems.map(({ id, productId }) =>
              productId ? (
                <div key={id} className="col-12 col-sm-6 col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={productId.image || "default-image.png"} // Use a fallback image if image is null
                      className="card-img-top img-fluid"
                      alt={productId.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(productId.id)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{productId.name}</h5>
                      <p className="card-text">Price: ${productId.price}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveClick(productId.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p key={id}></p>
              )
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyWishlist;
