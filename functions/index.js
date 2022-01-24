const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
("sk_test_51KLZ6bSFRGypNxXy5GM1OX7h4s2zpTW8oq3nnRWbUVMXP7LEeljcxsVnEiJ0YazpDSol9sou7JVFLrDGssRNeNRM00B35xKOwz");


// api

// app config
const app = express();

// middleware
app.use(cors({origin: true}));
app.use(express.json());


// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("payments/create", async (req, res) => {
    const total = req.query.total;
    console.log(total);
    const paymentIntent = await stripe.paymentIntent.create({
        amount: total,
        currency: "usd",
    });
    // ok created
    res.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})



// listen command
exports.api = functions.https.onRequest(app);

// example endpoiont 
// http://localhost:5001/clone-b836d/us-central1/api
