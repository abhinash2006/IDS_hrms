import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

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

        <div>

            <h1>
                Offer Letters
            </h1>

            <table
                border="1"
                cellPadding="10"
                width="100%"
            >

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

                    {offers.map((offer) => (

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
                                {offer.joining_date}
                            </td>

                            <td>
                                ₹{offer.salary}
                            </td>

                            <td>
                                {offer.offer_status}
                            </td>

                            <td>

                                <button
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

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default OfferLetters;