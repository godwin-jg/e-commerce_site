// sk_test_51MoUolSAKU7oRdPlkeBHKqwDt9BuCTgW0Anyl0j3Qdfx2Th2rnVtdtjXgDgpSVeNcw2mS0ILwS5LcokxLFNgLoZC00Q8ImKLaW
// Coffee: price_1MoVbSSAKU7oRdPlYX1wVS3K
// Sunglasses : price_1MoW8ySAKU7oRdPl9xoKZ4P3
// Camera : price_1MoWA0SAKU7oRdPlzSVS5tzH

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MoUolSAKU7oRdPlkeBHKqwDt9BuCTgW0Anyl0j3Qdfx2Th2rnVtdtjXgDgpSVeNcw2mS0ILwS5LcokxLFNgLoZC00Q8ImKLaW"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  // console.log(req.body)
  const items = req.body.items;
  let lineItems = [];
  items.forEach((items) => {
    lineItems.push({
      price: items.id,
      quantity: items.quantity,
    });
  });
  .log("ok", lineItems);
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on Port 4000"));
