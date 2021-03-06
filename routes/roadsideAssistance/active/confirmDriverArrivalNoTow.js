const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, other_user_id } = req.body;

        collection.find({ unique_id: { "$in": [id, other_user_id]}}).toArray((err, users) => {
            if (err) {
                console.log("err", err);

                responseee.json({
                    err,
                    message: "critical error occurred..."
                })
                
            } else {

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                    
                        if (user.unique_id === other_user_id) {
                            console.log("other ------------ :", user);

                            if (_.has(user.active_roadside_assistance_job, "arrived") && user.active_roadside_assistance_job.arrived === true) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        }
                    }
                })

                promiseee.then((passedData) => {
                    if (passedData === true) {
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            
                            if (user.unique_id === id) {
        
                                user.towing_services_start.arrived = true;
                                user.towing_services_start.page = "complete-trip-no-tow";
                                user.towing_services_start["agree_job_completed"] = false;
        
                                console.log("signed-in ------------ :", user);

                                collection.save(user, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        responseee.json({
                                            message: "Both users have confirmed the arrival!"
                                        })
                                    }
                                });
                            }
                        }
                    } else {

                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            
                            if (user.unique_id === id) {
        
                                user.towing_services_start.arrived = true;
        
                                console.log("signed-in ------------ :", user);

                                collection.save(user, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        responseee.json({
                                            message: "Both users have confirmed the arrival!"
                                        })
                                    }
                                });
                            }
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;