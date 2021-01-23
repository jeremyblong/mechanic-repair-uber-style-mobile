const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                console.log("This is my user....:", user); 

                axios.post(`${config.get("ngrok_url")}/notify/other/user/arrival/tow`, {
                    id: user.active_roadside_assistance_jobs.requestee_id,
                    fullName: user.fullName,
                    profilePic: user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg",
                    other_user_id: id
                }).then((res) => {
                    if (res.data.message === "Notified!") {
                        console.log("success!");
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })

                res.json({
                    message: "Notified other user successfully!",
                    user
                })
            } else {
                res.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;