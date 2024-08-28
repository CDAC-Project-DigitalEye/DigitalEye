import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyWallet = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  const [walletAmount, setWalletAmount] = useState(user.walletAmount);

  const [walletRequest, setWalletRequest] = useState({
    id: user.id,
    walletAmount: "",
  });

  const [fetchUserWallet, setFetchUserWallet] = useState({});
  const [errors, setErrors] = useState({ walletAmount: "" });

  walletRequest.userId = user.id;

  const handleInput = (e) => {
    setWalletRequest({ ...walletRequest, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getMyWallet = async () => {
      const userResponse = await retrieveMyWallet();
      if (userResponse) {
        setFetchUserWallet(userResponse.user);
        setWalletAmount(userResponse.user.walletAmount);
      }
    };

    getMyWallet();
  }, []);

  const retrieveMyWallet = async () => {
    const response = await axios.get(
      "http://13.60.230.109:8080/api/user/id?userId=" + user.id
    );

    return response.data;
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script from the DOM when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!walletRequest.walletAmount) {
      newErrors.walletAmount = "Amount is required";
      isValid = false;
    } else if (isNaN(walletRequest.walletAmount) || walletRequest.walletAmount <= 0) {
      newErrors.walletAmount = "Amount must be a positive number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addMoneyInWallet = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch("http://13.60.230.109:8080/api/user/update/wallet", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletRequest),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.responseCode === 0) {
            console.log("Success Response");
            var options = res.razorPayRequest;
            console.log(options);

            options.handler = function (response) {
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              response.razorpay_order_id = options.orderId;

              fetch("http://13.60.230.109:8080/api/user/razorpPay/response", {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(response),
              })
                .then((result) => {
                  result.json().then((res) => {
                    if (res.responseCode === 0) {
                      toast.success(res.responseMessage, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });

                      setTimeout(() => {
                        window.location.reload(true);
                      }, 1000);
                    } else {
                      toast.error(res.responseMessage, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });

                      setTimeout(() => {
                        window.location.reload(true);
                      }, 1000);
                    }
                  });
                })
                .catch((error) => {
                  console.error(error);
                  toast.error("It seems server is down", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setTimeout(() => {
                    window.location.reload(true);
                  }, 1000);
                });
            };

            if (window.Razorpay) {
              const rzp1 = new window.Razorpay(options);
              rzp1.on("payment.failed", function (response) {
                console.log(response.error);
                response.razorpay_order_id = options.orderId;

                fetch("http://13.60.230.109:8080/api/user/razorpPay/response", {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(response),
                })
                  .then((result) => {
                    result.json().then((res) => {
                      if (res.responseCode === 0) {
                        toast.success(res.responseMessage, {
                          position: "top-center",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });

                        setTimeout(() => {
                          window.location.reload(true);
                        }, 1000);
                      } else {
                        toast.error(res.responseMessage, {
                          position: "top-center",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });

                        setTimeout(() => {
                          window.location.reload(true);
                        }, 1000);
                      }
                    });
                  })
                  .catch((error) => {
                    console.error(error);
                    toast.error("It seems server is down", {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    setTimeout(() => {
                      window.location.reload(true);
                    }, 1000);
                  });
              });
              rzp1.open();
            } else {
              toast.error("Payment Gateway Internal Server Issue", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.reload(true);
              }, 1000);
            }
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      });
  };

  return (
    <div>
      <div className="mt-2 mb-4 d-flex align-items-center justify-content-center">
        <div className="card form-card custom-bg" style={{ width: "25rem" }}>
          <div
            className="card-header bg-color text-center custom-bg-text mb-3"
            style={{
              borderRadius: "1em",
              height: "50px",
            }}
          >
            <h3>My Wallet</h3>
          </div>
          <h4 className="ms-3 text-color text-center">
            Wallet Balance: &#8377; {walletAmount}
          </h4>

          <hr />

          <div
            className="card-header bg-color text-center custom-bg-text"
            style={{
              borderRadius: "1em",
              height: "50px",
            }}
          >
            <h4 className="card-title">Add Money In Wallet</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3 text-color">
                <label htmlFor="walletAmount" className="form-label">
                  <b>Amount</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="walletAmount"
                  onChange={handleInput}
                  value={walletRequest.walletAmount}
                  placeholder="Enter amount to add"
                  required
                />
                {errors.walletAmount && (
                  <div className="text-danger">{errors.walletAmount}</div>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  onClick={addMoneyInWallet}
                >
                  Update Wallet
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;

