// https://github.com/rails/webpacker/issues/1015#issuecomment-443268352
// wrapper around axios to include Rails CSRF token
import axios from "axios";

const token = document.querySelector('[name="csrf-token"]') || {
  content: "no-csrf-token",
};
const ax = axios.create({
  headers: {
    common: {
      "X-CSRF-Token": token.content,
    },
  },
});

export default ax;
