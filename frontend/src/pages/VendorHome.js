import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";
import { FaBasketShopping, FaCookieBite } from "react-icons/fa6";
import { RiStore2Line } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDeliveryDining } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

const VendorHome = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5" id="contentSection">
        <h1 className="text-center mb-3 pb-3 display-3">Baker's Dashboard</h1>
        <p className="text-center mb-4 offset-md-2 col-md-8">
          Welcome to your dashboard! Here, you can easily manage your products,
          view customer orders, and track your sales performance. Use the
          options below to navigate through your tasks efficiently.
        </p>

        {/* Manage Section */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <FaCookieBite
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <h3 className="card-title">Add Products</h3>
                <p className="card-text">Add products from your store.</p>
                <Link to="/addproduct" className="btn btn-warning">
                  Go to add products
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <FaBasketShopping
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <h3 className="card-title">View Orders</h3>
                <p className="card-text">View and manage customer orders.</p>
                <Link to="/view-orders" className="btn btn-warning">
                  Go to view orders
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <MdRestaurantMenu
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <h3 className="card-title">Manage Products</h3>
                <p className="card-text text-justify">
                  View and manage your products
                </p>
                <Link to="/viewProducts" className="btn btn-warning">
                  Go to manage products
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Details Cards Section */}
        <div className="text-center mt-5 pt-5">
          <h2 className="text-brown">How It Works</h2>
          <p> Checkout the simple steps to pass your favourites to the world.</p>
        </div>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <RiStore2Line
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <h5 className="card-title pt-2">1. Set Up Your Store</h5>
                <p className="card-text text-justify pt-3">
                  Get started with Bakers Basket by creating your personalized
                  online storefront. Upload enticing photos of your baked goods,
                  set your prices, and customize your store’s look to reflect
                  your unique brand.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <AiOutlineShoppingCart
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <h5 className="card-title pt-2">2. Receive Orders</h5>
                <p className="card-text text-justify pt-3">
                  Once your store is live, customers can browse your delicious
                  offerings and place orders from anywhere. You’ll receive
                  instant notifications for every new order, keeping you in the
                  loop.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <MdDeliveryDining
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <h5 className="card-title pt-2">3. Prepare and Deliver</h5>
                <p className="card-text text-justify pt-3">
                  Confirm orders and prepare your baked goods with the utmost
                  care. Pack them securely to ensure they arrive fresh and
                  delightful at your customers' doorsteps.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <FaMoneyBillWave
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <h5 className="card-title text-center pt-2">4. Get Paid</h5>
                <p className="card-text text-justify pt-3">
                  After fulfilling each order, payments are processed through
                  the secure Bakers Basket system. Funds are transferred
                  directly to your account, providing you with peace of mind and
                  smooth transactions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="container my-5 py-5">
          <div className="text-center mb-4">
            <h2 className="text-brown">Frequently Asked Questions</h2>
            <p>
              Find answers to the most common questions about your baker
              experience.
            </p>
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
                  How do I add products to my store?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You can add products by navigating to the "Add Products"
                  section of your dashboard. Fill in the required details such
                  as name, price, description, and upload images.
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
                  What should I do if I receive a customer complaint?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Please address customer complaints promptly by contacting them
                  directly. If the issue persists, reach out to our support team
                  for further assistance.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  How do I process payments for my orders?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Payments are processed automatically through the Bakers Basket
                  system once an order is confirmed. You will receive funds
                  directly in your account after each transaction.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  What payment methods are accepted for my customers?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  We accept various payment methods, including credit cards,
                  debit cards, ensuring convenience for your customers.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSeven">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSeven"
                  aria-expanded="false"
                  aria-controls="collapseSeven"
                >
                  How can I promote my products to increase sales?
                </button>
              </h2>
              <div
                id="collapseSeven"
                className="accordion-collapse collapse"
                aria-labelledby="headingSeven"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You can promote your products through social media marketing,
                  offering discounts or promotions, and participating in
                  community events. We also provide marketing resources in the
                  vendor dashboard to help you reach more customers.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingEight">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseEight"
                  aria-expanded="false"
                  aria-controls="collapseEight"
                >
                  What should I do if I have a technical issue with the
                  platform?
                </button>
              </h2>
              <div
                id="collapseEight"
                className="accordion-collapse collapse"
                aria-labelledby="headingEight"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  If you encounter any technical issues, please contact our
                  support team through the "Help" section of your dashboard. We
                  are here to assist you and resolve any problems as quickly as
                  possible.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTen">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTen"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                >
                  How do I manage my inventory levels?
                </button>
              </h2>
              <div
                id="collapseTen"
                className="accordion-collapse collapse"
                aria-labelledby="headingTen"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You can manage your inventory levels in the "Manage Products"
                  section of your dashboard. Here, you can update quantities.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default VendorHome;
