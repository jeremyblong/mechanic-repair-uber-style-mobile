const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));
const axios = require('axios');
const { decrypt } = require("../../../../crypto");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, mainResponse) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, vehicle, agreement, other_user_id } = req.body;

        console.log(req.body);

        collection.find({ unique_id: { "$in": [id, other_user_id]}}).toArray(async (err, users) => {
            if (err) {

                mainResponse.json({
                    message: "Critical error....",
                    err
                })
            } else {

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // mechanic user
                        if (user.unique_id === other_user_id) {
                            
                            for (let idxxx = 0; idxxx < user.accepted_jobs.length; idxxx++) {

                                const job = user.accepted_jobs[idxxx];

                                if (job.id === agreement.id) {

                                    job.poster_agrees_completion = true;

                                    collection.save(user);

                                    resolve(user);
                                }
                            }
                        }
                    }
                })

                promiseee.then(async (mechanicUser) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // client user
                        if (user.unique_id === id) {

                            for (let idxxx = 0; idxxx < user.accepted_jobs.length; idxxx++) {

                                const job = user.accepted_jobs[idxxx];

                                if (job.id === agreement.id) {

                                    job.poster_agrees_completion = true;

                                    collection.save(user);

                                    if (job.other_user_agrees_completion === true && job.poster_agrees_completion === true) {

                                        console.log("ran");

                                        axios.post(`${config.get("ngrok_url")}/remove/broken/vehicle/listing`, {
                                            client_id: id,
                                            vehicle
                                        }).then(async (resp) => {
                                            if (resp.data.message === "Successfully marked as COMPLETE.") {

                                                const paymentIntent = await stripe.paymentIntents.capture(
                                                    job.payment_intent.id
                                                ).catch((response) => {
                                                    console.log("RESponse", response);

                                                    if (response.raw.message === "This PaymentIntent could not be captured because it has already been captured.") {

                                                        console.log("ERROR ALREADY PAID RAN...");
                                                        
                                                        mainResponse.json({
                                                            message: "STRIPE error occurred...",
                                                            err: response.raw.message
                                                        })
                                                    }
                                                });

                                                
        
                                                if (paymentIntent) {

                                                    console.log("PAYMENT INTENT RAN....")

                                                    mainResponse.json({
                                                        message: "Successfully notifed user of completion and updated data in db!"
                                                    })
                                                }
                                            } else {
                                                console.log("ERr", resp.data)
                                            }
                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                    } else {
                                        mainResponse.json({
                                            message: "Marked half complete!"
                                        })
                                    }
                                }
                            }
                        }
                    }
                })
            }
        });
    });
});

module.exports = router;