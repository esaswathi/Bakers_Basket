import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { gql, useQuery } from "@apollo/client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Container, Card, Alert } from "react-bootstrap";
import "../assets/css/style.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const GET_SALES_REPORT = gql`
  query GetSalesReport {
    salesReport {
      productName
      totalSales
    }
  }
`;

const SalesReportChart = () => {
  const { loading, error, data } = useQuery(GET_SALES_REPORT);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (data) {
      const productNames = data.salesReport.map((item) => item.productName);
      const totalSales = data.salesReport.map((item) => item.totalSales);

      setChartData({
        labels: productNames,
        datasets: [
          {
            label: "Total Sales",
            data: totalSales,
            backgroundColor: "rgba(255, 165, 0, 0.6)",
            borderColor: "rgba(255, 165, 0, 1)",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [data]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading sales report, please wait...</p>
      </div>
    );
  }

  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <div>
      <Navbar />
      <Container className="my-4">
        <h2 className="text-center display-4 mb-2">Sales Report</h2>
        <p
          className="text-center mb-4"
          style={{ fontSize: "1.2rem", color: "#555" }}
        >
          This chart provides an overview of the total sales for each product.
          Analyze the data to identify trends and make informed decisions.
        </p>
        <Card
          className="shadow my-5"
          style={{ padding: "20px", borderRadius: "15px" }}
        >
          <Card.Body>
            {chartData && chartData.labels && chartData.labels.length > 0 ? (
              <div style={{ height: "400px", width: "100%" }}>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                        labels: {
                          font: {
                            size: 16,
                            family: "Arial",
                          },
                        },
                      },
                      title: {
                        display: true,
                        text: "Total Sales by Product",
                        font: {
                          size: 18,
                          weight: "bold",
                        },
                        padding: {
                          bottom: 20,
                        },
                      },
                      tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        titleColor: "#fff",
                        bodyColor: "#fff",
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Products",
                          font: {
                            size: 16,
                            weight: "bold",
                          },
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Total Sales",
                          font: {
                            size: 16,
                            weight: "bold",
                          },
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <p>No data available</p>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default SalesReportChart;
