/**
 * Created by gopi on 11/26/14.
 */
Meteor.startup(function () {
    console.log("Printing env variables ...");
    console.log("ROOT URL", process.env.ROOT_URL);
    console.log("MONGO URL",process.env.MONGO_URL);
});

