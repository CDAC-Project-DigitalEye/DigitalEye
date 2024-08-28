
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ViewMyStudioBookings = () => {
  let user = JSON.parse(sessionStorage.getItem("active-studio"));

  const [allBookings, setAllBookings] = useState([]);

  const [bookingStatus, setBookingStatus] = useState([]);

  const [updateBookingStatus, setUpdateBookingStatus] = useState({
    bookingId: "",
    bookingStatus: "",
  });

  const handleInput = (e) => {
    setUpdateBookingStatus({
      ...updateBookingStatus,
      [e.target.name]: e.target.value,
    });
  };

  const retrieveAllBookingStatus = async () => {
    const response = await axios.get(
      "http://13.60.230.109:8080/api/book/studio/fetch/status"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllBooking = async () => {
      const allBooking = await retrieveAllBooking();
      if (allBooking) {
        setAllBookings(allBooking.bookings);
      }
    };

    const getAllBookingStatus = async () => {
      const allBookingStatus = await retrieveAllBookingStatus();
      if (allBookingStatus) {
        setBookingStatus(allBookingStatus);
      }
    };

    getAllBookingStatus();
    getAllBooking();
  }, []);

  const retrieveAllBooking = async () => {
    const response = await axios.get(
      "http://13.60.230.109:8080/api/book/studio/fetch/bookings?studioId=" +
        user.studioId
    );
    console.log(response.data);
    return response.data;
  };

  const updateStudioBookingStatus = (e) => {
    fetch("http://13.60.230.109:8080/api/book/studio/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookingStatus),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log("response", res);
        setUpdateBookingStatus({
          bookingId: "",
          bookingStatus: "",
        });

        setAllBookings(res.bookings);
      });
    });

    e.preventDefault();
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card  mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>Studio Bookings</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Studio</th>
                  <th scope="col">Studio Name</th>
                  <th scope="col">Studio Email</th>
                  <th scope="col">Studio Contact</th>
                  <th scope="col">Booking Id</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Contact</th>
                  <th scope="col">Booked Date</th>
                  <th scope="col">Booked Time</th>
                  <th scope="col">Total Payable Amount</th>
                  <th scope="col">Booking Status</th>
                  <th scope="col">Update Booking Status</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://13.60.230.109:8080/api/studio/" +
                            booking.studioImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>

                      <td>
                        <b>{booking.studioName}</b>
                      </td>
                      <td>
                        <b>{booking.studioEmail}</b>
                      </td>
                      <td>
                        <b>{booking.studioContact}</b>
                      </td>

                      <td>
                        <b>{booking.bookingId}</b>
                      </td>
                      <td>
                        <b>{booking.customerName}</b>
                      </td>
                      <td>
                        <b>{booking.customerContact}</b>
                      </td>

                      <td>
                        <b>{booking.bookedDate}</b>
                      </td>
                      <td>
                        <b>{booking.bookedTime}</b>
                      </td>

                      <td>
                        <b>{booking.totalAmount}</b>
                      </td>
                      <td>
                        <b>{booking.status}</b>
                      </td>

                      <td>
                        {(() => {
                          if (booking.status === "Pending") {
                            return (
                              <Link
                                to={`/studio/verify/booking/${booking.id}`}
                                className="nav-link active btn btn-sm"
                                aria-current="page"
                              >
                                <b className="text-color">Verify Booking</b>
                              </Link>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyStudioBookings;


