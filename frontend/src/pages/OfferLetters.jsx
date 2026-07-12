import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import "../styles/OfferLetters.css";
function OfferLetters() {

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {

        try {

            const response =
                await axiosInstance.get(
                    "/offers"
                );

            setOffers(
                response.data.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const downloadPdf = (id) => {

        window.open(
            `http://localhost:5000/api/offers/${id}/pdf`,
            "_blank"
        );

    };

   return (
  <div className="offer-page">

    <div className="offer-header">

      <h1>
        Offer Letters
      </h1>

      <p>
        Generate and download offer letters for selected candidates.
      </p>

    </div>

    <div className="offer-table-card">

      <div className="table-container">

        <table className="custom-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Candidate ID</th>

              <th>Offer Title</th>

              <th>Joining Date</th>

              <th>Salary</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              offers.length === 0
              ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "2rem"
                    }}
                  >
                    No offer letters found
                  </td>
                </tr>
              )
              : (
                offers.map((offer) => (

                  <tr key={offer.id}>

                    <td>
                      {offer.id}
                    </td>

                    <td>
                      {offer.candidate_id}
                    </td>

                    <td>
                      {offer.offer_title}
                    </td>

                    <td>
                      {
                        offer.joining_date
                          ?.split("T")[0]
                      }
                    </td>

                    <td>
                      ₹
                      {
                        Number(
                          offer.salary
                        ).toLocaleString(
                          "en-IN"
                        )
                      }
                    </td>

                    <td>

                      <span
                        className="offer-status"
                      >
                        {
                          offer.offer_status
                        }
                      </span>

                    </td>

                    <td>

                      <button
                        className="offer-download-btn"
                        onClick={() =>
                          downloadPdf(
                            offer.id
                          )
                        }
                      >
                        Download PDF
                      </button>

                    </td>

                  </tr>

                ))
              )
            }

          </tbody>

        </table>

      </div>

    </div>

  </div>
);

}

export default OfferLetters;