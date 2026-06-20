

const User = require("../Models/Auth")
const Workspace = require("../Models/Workspace")
const WorkspaceViewed = require("../Models/ViwedOn")


// /api/Analytcs/View
const ViewdAt = async (req, res, next) => {
    try {
        console.log(WorkspaceViewed, 'WorkspaceViewed');
        const { Userid, WorkspaceId } = req.body
        console.log(req.body, 'Viewd Feat Api Datas')
        if (!Userid || !WorkspaceId) {
            const FieldMissing = new Error("Some Feilds Are Missing.")
            FieldMissing.status = 404
            return next(FieldMissing)
        }
        // check the userid if exits then next 
        const isuserexits = await User.findById({ _id: Userid });
        if (!isuserexits) {
            const NouserFound = new Error("No user Found.")
            NouserFound.status = 404
            return next(NouserFound)
        }
        // check the Spaceid if exits then next 


        const isworkspaceexits = await Workspace.findById(WorkspaceId)



        if (!isworkspaceexits) {
            const WorkspaceIdNotfound = new Error("WorkspaceId Not Found.")
            WorkspaceId.status = 404
            return next(WorkspaceId)
        }

        // Check the userid Viewd 

        const ViewAt = await WorkspaceViewed.findOne({ UserId: Userid })
        console.log(ViewAt, 'ViewAt')

        if (!ViewAt) {

            // creta a new obj
            const AddViewObj = new WorkspaceViewed({
                UserId: Userid, WorkspaceId: WorkspaceId

            })
            await AddViewObj.save()
            return res.status(201).json({
                message: "Viewed Added"
            })


        }


        ViewAt.WorkspaceId = WorkspaceId

        await ViewAt.save()






        return res.status(201).json({ message: "Updated" })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

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
module.exports = { ViewdAt, FetchView }