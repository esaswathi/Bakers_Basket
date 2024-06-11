import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../assets/images/user_banner.jpeg";
import "../assets/css/style.css";
import { FaHeart } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { FaRegGrinStars } from "react-icons/fa";
import { BsQuestionSquare } from "react-icons/bs";
import baker1 from "../assets/images/bakers/amycakes.jpeg";
import baker2 from "../assets/images/bakers/Bitton.jpeg";
import baker3 from "../assets/images/bakers/zack.jpeg";
import baker4 from "../assets/images/bakers/Jenny.jpg";
import baker1_backgroundImage from "../assets/images/users_banner.jpg";
import baker2_backgroundImage from "../assets/images/user_banner_cookie.jpg";
import baker3_backgroundImage from "../assets/images/user_banner.jpeg";
import product1 from "../assets/images/products/choco_cookie.jpg";
import product2 from "../assets/images/products/Blueberry Muffins.jpg";
import product3 from "../assets/images/products/redvelevet cake.jpeg";

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* User Header - Banner */}
      <header>
        <div
          id="bannerImage"
          className="bg-cover"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <div className="text-light ps-5 pb-5 card-container">
            {/* Card Content */}
            <div className="card text-dark">
              <div className="card-body">
                <h5 className="card-title">
                  Indulge in Homemade Baked Goodness{" "}
                  <span className="card-marks display-5">!!!</span>
                </h5>
                <p className="card-text">
                  Explore a delightful assortment of homemade baked treats
                  crafted by our talented local bakers.
                </p>
                <form className="mt-3">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your ZIP code"
                    />
                    <button type="submit" className="btn btn-warning text-dark">
                      Explore Treats
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Brand Highlights Section */}
      <section className="container my-5 py-5">
        <div className="text-center mb-4">
          <FaHeart className="text-warning" style={{ fontSize: "3rem" }} />
          <h5 className="p-3 text-brown">"Made with Love"</h5>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <h1 className="mb-4 display-5">Made with Passion</h1>
            <p className="text-justify">
              Discover an array of baked goods lovingly crafted by our
              passionate local bakers. Each treat is made with the finest
              ingredients and a whole lot of love.
            </p>
          </div>
          <div className="col-lg-3">
            <h2 className="mb-4 display-5">Handcrafted Goodness</h2>
            <p className="text-justify">
              Indulge in handcrafted goodness! Each products are made fresh,
              using traditional recipes and techniques, ensuring every bite is
              full of flavor and delight.
            </p>
          </div>
          <div className="col-lg-3">
            <h2 className="mb-4 display-5">Quality Ingredients</h2>
            <p className="text-justify">
              We believe in quality ingredients for quality taste. From the
              finest flour to the freshest fruits, our bakers source only the
              best ingredients for your enjoyment.
            </p>
          </div>
          <div className="col-lg-3">
            <h2 className="mb-4 display-5">Qualified Bakers</h2>
            <p className="text-justify">
              With years of experience and expertise, our lovely bakers ensure
              each baked good meets the highest standards of quality and taste.
            </p>
          </div>
        </div>
      </section>

      {/* Bakers List Section */}
      <section className="container-fluid bg-light py-5">
        <div className="container">
          <div className="text-center mb-4">
            <SiCodechef className="text-warning" style={{ fontSize: "3rem" }} />
            <h2 className="p-3 text-brown">Meet Our Baker'S</h2>
          </div>

          <div
            id="bakerCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card position-relative">
                      <div
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ zIndex: "1" }}
                      >
                        <img
                          src={baker1}
                          className="rounded-circle"
                          alt="Baker"
                          style={{
                            width: "100px",
                            height: "100px",
                            border: "5px solid #fff",
                          }}
                        />
                      </div>
                      <img
                        src={baker1_backgroundImage}
                        className="card-img-top"
                        alt="Baker 1"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Amy Jacky</h5>
                        <p className="card-text">Specialized in Cakes</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card position-relative">
                      <div
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ zIndex: "1" }}
                      >
                        <img
                          src={baker2}
                          className="rounded-circle"
                          alt="Baker"
                          style={{
                            width: "100px",
                            height: "100px",
                            border: "5px solid #fff",
                          }}
                        />
                      </div>
                      <img
                        src={baker2_backgroundImage}
                        className="card-img-top"
                        alt="Baker 1"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Bitton</h5>
                        <p className="card-text">Specialized in Cookies</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card position-relative">
                      <div
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ zIndex: "1" }}
                      >
                        <img
                          src={baker3}
                          className="rounded-circle"
                          alt="Baker"
                          style={{
                            width: "100px",
                            height: "100px",
                            border: "5px solid #fff",
                          }}
                        />
                      </div>
                      <img
                        src={baker3_backgroundImage}
                        className="card-img-top"
                        alt="Baker 1"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Zack George</h5>
                        <p className="card-text">Specialized in Cupcakes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#bakerCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#bakerCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Customer Reviews  Section*/}
      <section className="container-fluid bg-light py-5">
        <div className="container">
          <div className="text-center mb-4">
            <FaRegGrinStars
              className="text-warning"
              style={{ fontSize: "3rem" }}
            />
            <h2 className="p-3 text-brown">Customer Reviews</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img
                  src={product1}
                  className="card-img-top"
                  alt="Product 1"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Chocolate Chip Cookies</h5>
                  <p className="card-text">By: Bitton Sweets</p>
                  <p className="card-text">
                    "The best cookies I've ever had! Freshly baked and
                    delicious."
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-warning">
                        View Details
                      </button>
                    </div>
                    <small className="text-muted">Rating: 5/5</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img
                  src={product2}
                  className="card-img-top"
                  alt="Product 2"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Blueberry Muffins</h5>
                  <p className="card-text">By: Zack Bakes</p>
                  <p className="card-text">
                    "Absolutely divine! Moist and bursting with flavor."
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-warning">
                        View Details
                      </button>
                    </div>
                    <small className="text-muted">Rating: 4.5/5</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img
                  src={product3}
                  className="card-img-top"
                  alt="Product 3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Red Velvet Cake</h5>
                  <p className="card-text">By: Amy's Cakes</p>
                  <p className="card-text">
                    "A slice of heaven, Moist and flavorful. Even looks so
                    attractive!"
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-warning">
                        View Details
                      </button>
                    </div>
                    <small className="text-muted">Rating: 4/5</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="container-fluid bg-warning py-5">
        <div className="container">
          <div className="text-center mb-4">
            <BsQuestionSquare
              className="text-light"
              style={{ fontSize: "3rem" }}
            />
            <h2 className="p-3 text-brown">Frequently Asked Questions</h2>
          </div>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="question1">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse1"
                  aria-expanded="false"
                  aria-controls="collapse1"
                >
                  What is the shelf life of the meals?
                </button>
              </h2>
              <div
                id="collapse1"
                className="accordion-collapse collapse"
                aria-labelledby="question1"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  The shelf life of our meals varies depending on the specific
                  dish. We provide detailed information about the shelf life of
                  each meal on our website and packaging.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="question2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse2"
                  aria-expanded="false"
                  aria-controls="collapse2"
                >
                  Are meals delivered ready to eat?
                </button>
              </h2>
              <div
                id="collapse2"
                className="accordion-collapse collapse"
                aria-labelledby="question2"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, all our meals are delivered fully cooked and ready to
                  eat. Simply heat them according to the instructions provided,
                  and they'll be ready to enjoy.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="question3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                >
                  What areas do you serve?
                </button>
              </h2>
              <div
                id="collapse3"
                className="accordion-collapse collapse"
                aria-labelledby="question3"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  We currently serve the following areas: [List of areas
                  served].
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="question4">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse4"
                  aria-expanded="false"
                  aria-controls="collapse4"
                >
                  Are there any delivery fees?
                </button>
              </h2>
              <div
                id="collapse4"
                className="accordion-collapse collapse"
                aria-labelledby="question4"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, we charge a flat delivery fee for all orders. The exact
                  fee may vary depending on your location and order size.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="question5">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse5"
                  aria-expanded="false"
                  aria-controls="collapse5"
                >
                  What happens if I am not at home during the delivery?
                </button>
              </h2>
              <div
                id="collapse5"
                className="accordion-collapse collapse"
                aria-labelledby="question5"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  If you're not at home during the delivery, our delivery
                  personnel will leave the package in a safe and secure location
                  specified by you during checkout. Alternatively, you can
                  reschedule the delivery for a more convenient time.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
