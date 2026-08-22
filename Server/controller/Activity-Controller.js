const Projectactivity = require("../Models/Activity");

const SaveActiviy = async (Activity) => {
    try {


        if (!Activity) {
            return 400;
        }

        await Projectactivity.create(Activity);

        return 201;

    } catch (error) {
        console.log(error.message);

        return 500;
    }
};

module.exports = SaveActiviy;