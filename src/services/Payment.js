import axios from "axios";

export const paymentRequest = axios({
  method: "post",
  url: `/payment/create?total=${10}`,
});
