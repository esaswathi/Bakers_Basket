import { useQuery, useMutation, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { BsExclamation } from "react-icons/bs";
import { FaHeart, FaRegGrinStars } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { BsQuestionSquare } from "react-icons/bs";
import { RiCake3Fill } from "react-icons/ri";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../assets/images/user_banner.jpeg";
import baker1 from "../assets/images/bakers/amycakes.jpeg";
import baker2 from "../assets/images/bakers/Bitton.jpeg";
import baker3 from "../assets/images/bakers/zack.jpeg";
import baker4 from "../assets/images/bakers/Lily.jpg";
import baker5 from "../assets/images/bakers/Chris.jpeg";
import baker6 from "../assets/images/bakers/Sophie.jpeg";
import "../assets/css/style.css";

const FETCH_PRODUCTS_BY_ZIP_CODE = gql`
  query FetchProductsByZipCode($zipCode: String!) {
    productsByZipCode(zipCode: $zipCode) {
      id
      name
      description
      price
      stocks
      category
      image
      zipCode
      vendorId
    }
  }
`;

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stocks
      category
      image
      vendorId
      zipCode
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!, $vendorId: ID!) {
    addToCart(userId: $userId, productId: $productId, vendorId: $vendorId) {
      id
      userId
      productId {
        id
        name
      }
      vendorId
      quantity
      addedAt
    }
  }
`;

const Home = () => {
  const [zipCode, setZipCode] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [addToCart] = useMutation(ADD_TO_CART);
  const navigate = useNavigate();

  // Fetch products based on ZIP code
  const { data, loading, error } = useQuery(FETCH_PRODUCTS_BY_ZIP_CODE, {
    variables: { zipCode },
    skip: !zipCode, // Skip if ZIP code is empty
  });

  // Fetch latest products
  const {
    data: latestProductsData,
    loading: latestProductsLoading,
    error: latestProductsError,
  } = useQuery(GET_PRODUCTS);

  // Simulate user login check (replace with actual logic)
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Optionally handle form submission logic here
  };

  const handleAddToCart = async (productId, vendorId) => {
    if (!userLoggedIn) {
      alert("Please log in to add products to your cart.");
      return;
    }

    const userId = sessionStorage.getItem("userId");

    try {
      await addToCart({ variables: { userId, productId, vendorId } });
      alert("Product added to cart successfully!");
    } catch (error) {
      alert("Error adding product to cart.");
    }
  };

  // Latest Products Pagination
  const perPage = 6;
  const latestProducts = latestProductsData?.products || [];
  const currentProducts = latestProducts.slice(0, perPage);

  return (
    <div>
      <Navbar />

      {/* User Header - Banner */}
      <header>
        <div
          id="bannerImage"
          className="bg-cover d-flex align-items-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div className="container">
            <div className="row">
              <div>
                <h1>
                  Bake Your Dreams, Taste the L
                  <GoHeartFill className="text-light" />
                  ve
                </h1>
                <p className="col-md-5 ps-0" id="justify">
                  Hello<strong> Bakers</strong>, Set up your online bakery in
                  minutes and start sharing your passion with the world & Dear
                  <strong> Shoppers</strong>, Discover and indulge in local,
                  handcrafted treats from talented bakers near you.
                </p>
              </div>
              <div className="col-12 col-md-8 col-lg-6 text-light mt-3">
                <div className="card text-dark">
                  <div className="card-body">
                    <h5 className="card-title">
                      Indulge in Homemade Baked Goodness
                      <span className="card-marks display-5">
                        <BsExclamation />
                      </span>
                    </h5>
                    <p className="card-text">
                      Explore a delightful assortment of homemade baked treats
                      crafted by our talented local bakers.
                    </p>
                    <form className="my-4" onSubmit={handleFormSubmit}>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your ZIP code"
                          value={zipCode}
                          onChange={(e) =>
                            setZipCode(e.target.value.toUpperCase())
                          }
                        />
                        <button
                          type="submit"
                          className="btn btn-warning text-dark"
                        >
                          Explore Treats
                        </button>
                      </div>
                    </form>

                    {loading && <p>Loading...</p>}
                    {error && <p>Error fetching products</p>}
                    {data && data.productsByZipCode.length === 0 && (
                      <p>No products found for this ZIP code</p>
                    )}
                    {data &&
                      data.productsByZipCode.map((product) => (
                        <div key={product.id}>
                          <h2>{product.name}</h2>
                          <p>{product.description}</p>
                          <p>Price: ${product.price}</p>
                          <p>Category: {product.category}</p>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "200px" }}
                          />
                          <button
                            className="btn btn-warning ms-3"
                            onClick={() =>
                              handleAddToCart(product.id, product.vendorId)
                            }
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* New Arrival Section */}
      <section className="container my-5 py-5">
        <div className="text-center mb-4">
        <RiCake3Fill className="text-warning" style={{ fontSize: "3rem" }} />
          <h2 className="text-brown display-5">New Arrivals</h2>
          <p>Explore our latest additions and find your new favorite treats!</p>
        </div>
        {latestProductsLoading && <p>Loading latest products...</p>}
        {latestProductsError && (
          <p>Error fetching latest products: {latestProductsError.message}</p>
        )}
        {latestProductsData && (
          <div className="row">
            {latestProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      <strong>Price: </strong> ${product.price}
                    </p>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          handleAddToCart(
                            product.id,
                            sessionStorage.getItem("vendorId")
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Brand Highlights Section */}
      <section className="container my-5 py-5 px-4">
        <div className="text-center mb-4">
          <FaHeart className="text-warning" style={{ fontSize: "3rem" }} />
          <h5 className="p-3 text-brown">"Made with Love"</h5>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <h1 className="mb-4 display-5">Made with Passion</h1>
            <hr className="text-warning" />
            <p className="text-justify">
              Discover an array of baked goods lovingly crafted by our
              passionate local bakers. Each treat is made with the finest
              ingredients and a whole lot of love.
            </p>
          </div>
          <div className="col-lg-3">
            <h2 className="mb-4 display-5">Handcrafted Goodness</h2>
            <hr className="text-warning" />
            <p className="text-justify">
              From decadent cakes to scrumptious cookies, every product is a
              testament to our bakers' dedication to quality and taste.
            </p>
          </div>
          <div className="col-lg-3">
            <h2 className="mb-4 display-5">
              Local <br /> Favorites
            </h2>
            <hr className="text-warning" />
            <p className="text-justify">
              Support local businesses by enjoying the finest baked goods in
              your area. Each bite supports your community and brings you closer
              to home.
            </p>
          </div>
          <div className="col-lg-3">
            <h2 className="mb-4 display-5">
              Freshly <br /> Baked
            </h2>
            <hr className="text-warning" />
            <p className="text-justify">
              Our products are baked fresh daily, ensuring you always receive
              the highest quality treats.
            </p>
          </div>
        </div>
      </section>

      {/* Bakers List Section */}
      <section className="container my-5 py-5">
        <div className="text-center mb-4">
        <SiCodechef className="text-warning" style={{ fontSize: "3rem" }} />
          <h2 className="text-brown display-5">Our Expert Bakers</h2>
          <p>Meet the talented individuals behind your favorite treats!</p>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src={baker1}
                className="card-img-top"
                alt="Baker 1"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Amy Cakes</h5>
                <p className="card-text">Specializes in cakes and pastries.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src={baker2}
                className="card-img-top"
                alt="Baker 2"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Bitton Bakes</h5>
                <p className="card-text">
                  Known for artisanal cookies and tarts.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src={baker3}
                className="card-img-top"
                alt="Baker 3"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Zack's Bakes</h5>
                <p className="card-text">
                  Specialty in gourmet cookies and cakes.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src={baker4}
                className="card-img-top"
                alt="Baker 4"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Lily's Delights</h5>
                <p className="card-text">
                  Renowned for her exquisite pastries and tarts.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src={baker5}
                className="card-img-top"
                alt="Baker 5"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Chris's Confections</h5>
                <p className="card-text">
                  Expert in sweet treats and custom cakes.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src={baker6}
                className="card-img-top"
                alt="Baker 6"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Sophie Sweets</h5>
                <p className="card-text">
                  Specializes in vegan and gluten-free treats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="container my-5 py-5">
        <div className="text-center mb-4">
        <FaRegGrinStars className="text-warning" style={{ fontSize: "3rem" }} />
          <h2 className="text-brown display-5">Customer Reviews</h2>
          <p>See what our happy customers have to say!</p>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">
                  "The best cookies I've ever had! Fresh and delicious!"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Jane Smith</h5>
                <p className="card-text">
                  "Amazing cakes and pastries. Will definitely order again!"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Emily Johnson</h5>
                <p className="card-text">
                  "Fantastic service and even better baked goods. Highly
                  recommend!"
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Michael Brown</h5>
                <p className="card-text">
                  "Absolutely loved the variety of baked goods. The brownies
                  were to die for!"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Samantha Williams</h5>
                <p className="card-text">
                  "The attention to detail and taste is unmatched. My family
                  can't get enough!"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">David Wilson</h5>
                <p className="card-text">
                  "The freshness and quality of these baked goods are
                  incredible. Five stars!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container my-5 py-5">
        <div className="text-center mb-4">
        <BsQuestionSquare className="text-warning" style={{ fontSize: "3rem" }} />
          <h2 className="text-brown display-5">Frequently Asked Questions</h2>
          <p>Find answers to the most common questions about our services.</p>
        </div>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What is the delivery time for orders?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Delivery times vary depending on your location and the
                availability of the products. Generally, it takes between 2-5
                business days for delivery.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Can I customize my order?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, many of our products can be customized to suit your
                preferences. Please contact the baker directly for more
                information on customization options.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                What is your return policy?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                We do not accept returns for perishable items. However, if there
                is an issue with your order, please contact us within 24 hours
                and we will do our best to resolve it.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
