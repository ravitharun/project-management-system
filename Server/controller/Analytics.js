

const User = require("../Models/Auth")
const Workspace = require("../Models/Workspace")
const WorkspaceViewed = require("../Models/ViwedOn")

const ViewdAt = async (req, res, next) => {
    try {
        const { Userid, WorkspaceId } = req.body;

        if (!Userid || !WorkspaceId) {
            const err = new Error("Some Fields Are Missing.");
            err.status = 400;
            return next(err);
        }

        const isuserexits = await User.findById(Userid);

        if (!isuserexits) {
            const err = new Error("No User Found.");
            err.status = 404;
            return next(err);
        }

        const isworkspaceexits = await Workspace.findById(WorkspaceId);

        if (!isworkspaceexits) {
            const err = new Error("Workspace Not Found.");
            err.status = 404;
            return next(err);
        }

        let viewedDoc = await WorkspaceViewed.findOne({
            UserId: Userid,
        });

        // First View
        if (!viewedDoc) {
            viewedDoc = await WorkspaceViewed.create({
                UserId: Userid,
                viewedWorkspaces: [
                    {
                        WorkspaceId,
                        ViewedAt: new Date(),
                    },
                ],
            });

            return res.status(201).json({
                message: "Workspace Viewed",
                data: viewedDoc,
            });
        }

     
        viewedDoc.viewedWorkspaces =
            viewedDoc.viewedWorkspaces.filter(
                (item) =>
                    item.WorkspaceId.toString() !==
                    WorkspaceId.toString()
            );

        viewedDoc.viewedWorkspaces.unshift({
            WorkspaceId,
            ViewedAt: new Date(),
        });

        
        viewedDoc.viewedWorkspaces =
            viewedDoc.viewedWorkspaces.slice(0, 10);

        await viewedDoc.save();

        return res.status(200).json({
            message: "Viewed History Updated",
            data: viewedDoc,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const FetchView = async (req, res, next) => {
    try {
        const { userid } = req.query
        if (!userid) {
            const FieldMissing = new Error("Userid  is  Missing.")
            FieldMissing.status = 404
            return next(FieldMissing)
        }

        return res.status(200).json({ message: "Viewd", data: [] })
    } catch (error) {

        next(error)

    }
}
module.exports = { ViewdAt, FetchView }10