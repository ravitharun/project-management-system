const { tryCatch } = require("bullmq")
const crypto = require("crypto"); const Workspace = require("../Models/Workspace")

const User = require("../Models/Auth")
const WorkspaceStar = require("../Models/WorkspaceStar")
const EmailQueue = require("../Queues/Producer")
const worker = require("../Queues/Worker")
const cloudinary = require("../config/Clounadry")
const CreateWorkSpace = async (req, res) => {
    try {
        const { updatedData } = req.body
        console.log(updatedData, 'updatedData')
        console.log(updatedData?.workspaceBackground, 'workspaceBackground')
        const saveWorkspace = new Workspace({
            ...updatedData,
            // detailedInfo: updatedData?.detailedInfo,
            workspaceSetup: {
                ...updatedData.workspaceSetup,
                workspaceName: updatedData?.workspaceName,
                workspaceDescription: updatedData?.workspaceDescription,

                createby: {
                    userEmail: updatedData?.createby?.userEmail
                }
            }
        });
        await saveWorkspace.save()
        return res.status(200).json({ message: "workspace Created", status: true })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message, status: false })
    }
}

const FetchWorkspace = async (req, res) => {
    try {
        const { useremail } = req.query
        console.log(useremail, 'useremail')
        if (!useremail) {
            console.log("useremail is missing to Fetch the Work space")
            return res.status(404).json({ message: "Some thing Went Wrong." })
        }

        const FetchWorkspace = await Workspace.find({ "workspaceSetup.createby.userEmail": useremail })
        console.log(FetchWorkspace, 'FetchWorkspace')
        return res.status(200).json({ data: FetchWorkspace })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "server Error" })
    }
}



const updateBackgroundspace = async (req, res) => {
    try {
        const { selectedImg, id } = req.body
        console.log(req.body, 'req.query');

        if (!selectedImg) {
            return res.status(404).json({ message: "SomeThing Went Wrong." })
        }

        const isexitisWorkspace = await Workspace.findById({ _id: id })
        if (!isexitisWorkspace) {
            return res.status(404).json({ message: "The Workspace iS not exitis." })

        }
        const UpdateSetWorkspaceBackground = await Workspace.findByIdAndUpdate({ _id: id }, { workspaceBackground: selectedImg }, { returnDocument: "after" })
        console.log(UpdateSetWorkspaceBackground, 'UpdateSetWorkspaceBackground')
        res.status(200).json({ message: "Updated the workspaceBackground." })
    } catch (error) {
        console.log(error.message, 'err')

        res.status(500).json({ message: "server Error" })
    }
}



const handelupdateSpaceIcon = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data, 'data')
        if (!data) {
            return res.status(404).json({ message: "Data is empty" })
        }

        const isexitisWorkspace = await Workspace.findById({ _id: data.id })
        if (!isexitisWorkspace) {
            return res.status(404).json({ message: "NO workspace is Found  to Updte the workspace Icon " })
        }


        const UpdateSetWorkspaceIcon = await Workspace.findByIdAndUpdate({ _id: data.id }, { icon: data.choosed }, { returnDocument: "after" })
        console.log(UpdateSetWorkspaceIcon, 'UpdateSetWorkspaceIcon')
        res.status(200).json({ message: "Updated the UpdateSetWorkspaceIcon." })


    } catch (error) {

        res.status(500).json({ message: "server Error" })
    }
}


// DeleteWorkspace
const DeleteWorkspace = async (req, res) => {
    try {
        const { workspaceid } = req.query
        console.log(workspaceid, 'workspaceid')
        if (!workspaceid) { return res.status(404).json({ message: "Workspace ID is missing." }) }
        const isexitisWorkspace = await Workspace.findById({ _id: data.id })

        if (!isexitisWorkspace) {
            return res.status(404).json({ message: "NO workspace is Found  to Updated  the workspace Icon " })
        }
        const resposeDelete = await Workspace.findByIdAndDelete({ id: workspaceid })

        return res.status(200).json({ message: "Workspace removed successfully" });
    } catch (error) {

        console.log(error.message, 'err')

        return res.status(500).json({ message: "server error" })

    }
}


const handelCustomUoploadBackground = async (req, res) => {
    try {

        console.log(req.file)
        console.log(req.body.AddedEmail)
        console.log(req.body.updateSapceid)
        if (!req.body.updateSapceid || !req.body.AddedEmail) {
            return res.status(404).json({ message: "SomeThing went Wrong." })
        }
        const Uploaded_url = await cloudinary.uploader.upload(req.file.path)
        const isExitSpaceId = await Workspace.findByIdAndUpdate({ _id: req.body.updateSapceid }, { workspaceBackground: Uploaded_url?.secure_url }, { returnDocument: "after" })
        console.log(Uploaded_url?.secure_url, 'Uploaded_url')

        return res.status(200).json({ message: "Uploaded", Uploaded_url })
    } catch (error) {
        console.log(error.message, 'err')

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Workspace Id",
            });
        }
        return res.status(500).json({ message: "Server Error" })
    }
}

const handelCustomUoploadIcon = async (req, res) => {
    try {

        console.log(req.file)
        console.log(req.body.AddedBy, 'by')
        console.log(req.body.workspaceSpaceId)
        if (!req.body.workspaceSpaceId || !req.body.AddedBy) {
            return res.status(404).json({ message: "SomeThing went Wrong." })
        }
        const Uploaded_url = await cloudinary.uploader.upload(req.file.path)
        const isExitSpaceId = await Workspace.findByIdAndUpdate({ _id: req.body.workspaceSpaceId }, { icon: Uploaded_url?.secure_url }, { returnDocument: "after" })
        console.log(Uploaded_url?.secure_url, 'Uploaded_url')
        return res.status(200).json({ message: "Uploaded", Uploaded_url })
    } catch (error) {
        console.log(error.message, 'err')

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Workspace Id",
            });
        }
        return res.status(500).json({ message: "Server Error" })
    }
}


const AddWorkSpacememebers = async (req, res, next) => {
    try {
        const { data } = req.body

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );
        const isUserExitsInWorkspace = await Workspace.findById(data.workspace)
        if (!isUserExitsInWorkspace) {
            const err = new Error("Workspace not found");
            err.status = 404;
            return next(err);
        }

        const Emaildata = {
            ...isUserExitsInWorkspace,
            data,
            token,
            expiresAt
        }
        await EmailQueue.add("WorkspaceAcceptInvitation", Emaildata, {
            attempts: 3,
            backoff: {
                type: "fixed",
                delay: 1000,
            },
        })



        return res.status(200).json({
            message: 'Email Sent',
        });
    } catch (error) {
        console.log(error.message, 'err')
        next(error)

    }
}

// approve Email 
const ApproveEmail = async (req, res, next) => {
    try {

        const { AcceptEmail, workspaceid, toekn, expiresAt } = req.body
        console.log(req.body, "tharun")
        if (Date.now() > new Date(expiresAt).getTime()) {
            return res.status(400).json({
                status: "INVITE_EXPIRED",
                message: "Invitation has expired",
            });
        }

        if (!AcceptEmail) {
            const error = new Error("Email is required")
            error.status = 400
            return next(error)
        }

        const isWorkspaceExists = await Workspace.findById(workspaceid)

        if (!isWorkspaceExists) {
            const error = new Error("Workspace not found")
            error.status = 404
            return next(error)
        }

        const DbEmail = isWorkspaceExists.WorkSpacememebers.map((emails) => emails.email)
        const isEmailAlreadyExists = DbEmail.includes(AcceptEmail)

        if (isEmailAlreadyExists) {
            return res.status(409).json({
                message: "Email already exists in workspace"
            })
        }


        const CheckIsuserAccount = await User.findOne({ userEmail: AcceptEmail })

        console.log(CheckIsuserAccount, 'CheckIsuserAccount')

        if (!CheckIsuserAccount) {
            return res.status(403).json({ message: " Create Account ." })
        }

        const data = await Workspace.findByIdAndUpdate(
            workspaceid,
            {
                $push: {
                    WorkSpacememebers: [{
                        email: AcceptEmail,
                        id: CheckIsuserAccount._id
                    }]
                }
            },
            { returnDocument: "true" }
        )

        return res.status(201).json({
            status: true,
            message: "Member added to workspace successfully",
            data: data
        })

    } catch (error) {
        console.log("error", error.message)
        next(error)
    }
}




// MakeStar To Workspace  ---True
const MakeStarTOWorkspace = async (req, res, next) => {
    try {
        // isStared,useremail,id
        const { data } = req.body
        console.log(data.useremail, 'req.body')

        if (!data.useremail) {
            const error = new Error("Email is required")
            error.status = 400
            return next(error)
        }
        if (!data.id) {
            const error = new Error("id is required")
            error.status = 400
            return next(error)
        }

        const isWorkspaceExists = await Workspace.findById(data.id)

        if (!isWorkspaceExists) {
            const error = new Error("Workspace not found")
            error.status = 404
            return next(error)
        }


        // logicfor the Star-workspace
        //   if not Exits make the new Document

        const IsStarSpaceidExits = await WorkspaceStar.findOne({ workspaceID: data.id })
        if (!IsStarSpaceidExits) {

            const MakeStr = new WorkspaceStar({
                workspaceID: data.id,
                StarUsers: {
                    isstar: data.isStared,
                    emails: data.useremail,
                    UserId: data.UserId

                }

            })
            return await MakeStr.save()

        }

        // if Exits StarWorksapcespace

        const findByStrSpaceAdd = await WorkspaceStar.findOneAndUpdate
            ({ workspaceID: data.id }, {
                $push: {
                    StarUsers: {
                        isstar: data.isStared,
                        emails: data.useremail,
                        UserId: data.UserId
                    }
                }
            }, { returnDocument: "after" })



        return res.status(201).json({
            message: "Stared the Workspace"
        })

    } catch (error) {
        console.log("error", error.message)
        next(error)
    }
}


const StarWorkspaceByUserEmail = async (req, res, next) => {
    try {
        const { email } = req.query
        console.log(email, 'getemail')
        if (!email) {
            const error = new Error("Email Is required .")
            error.status = 404
            return next(error)
        }
        const findByStrSpace = await WorkspaceStar.find({
            StarUsers: {
                $elemMatch: {
                    emails: email,
                    isstar: true
                }
            }
        })
            .populate("workspaceID")
            .populate("StarUsers.UserId");
        console.log(findByStrSpace, 'findByStrSpace')
        if (findByStrSpace.length == 0) {
            const error = new Error("No Star Worksapce is Found.")
            error.status = 404
            return next(error)
        }

        return res.status(200).json({ message: "Fetching it..", Stardata: findByStrSpace })
    } catch (error) {
        console.log("error", error.message)
        next(error)

    }


}
const RemoveStarWorkspaceByUserEmail = async (req, res, next) => {
    try {
        const { email, SpaceId } = req.body
        console.log(req.body, 'reqresponse')
        if (!email) {
            const error = new Error("Email Is required .")
            error.status = 404
            return next(error)
        }
        if (!SpaceId) {
            const error = new Error("SpaceId Is required .")
            error.status = 404
            return next(error)
        }
        const CheckWorkSpaceId = await Workspace.findOne({ _id: SpaceId })
        console.log(CheckWorkSpaceId, 'CheckWorkSpaceId')
        if (!CheckWorkSpaceId) {
            const error = new Error("There is no Workspace Found .")
            error.status = 404
            return next(error)
        }


        const findByStrSpace = await WorkspaceStar.findOneAndUpdate(
            {
                workspaceID: SpaceId,
                "StarUsers.emails": email
            },
            {
                $set: {
                    "StarUsers.$.isstar": false
                }
            },
            {
                returnDocument: "after"
            }
        );
        if (!findByStrSpace) {
            const error = new Error("There is no findByStrSpace  Workspace Found .")
            error.status = 404
            return next(error)
        }




        return res.status(200).json({ message: findByStrSpace, Stardata: [] })
    } catch (error) {
        console.log("error", error.message)
        next(error)

    }


}


// Fetch the TeamInfo


const FetchTeamInfoWorkpsace = async (req, res, next) => {
    try {
        const { projectid } = req.query
        console.log(projectid, 'SpaceID')
        if (!projectid) {
            const err = new Error("SpaceID is required.")
            err.status = 404
            return err
        }

        const Isexits = await Workspace.findById(projectid).populate("WorkSpacememebers.id")
        // console.log(Isexits, 'checkisexits')
        if (!Isexits) {
            const err = new Error("There is no workspace")


            err.status = 404
            return err
        }

        console.log(Isexits.WorkSpacememebers.length, 'check')


        if (Isexits.WorkSpacememebers.length == 0) {
            console.log("hey")
            return res.status(404).json({ message: "No" })
        }

        return res.status(200).json({ message: Isexits.WorkSpacememebers })
    } catch (error) {
        console.log(error.message, 'err')
        next(error)

    }


}

module.exports = { CreateWorkSpace, FetchWorkspace, updateBackgroundspace, handelupdateSpaceIcon, DeleteWorkspace, handelCustomUoploadBackground, handelCustomUoploadIcon, AddWorkSpacememebers, ApproveEmail, MakeStarTOWorkspace, StarWorkspaceByUserEmail, RemoveStarWorkspaceByUserEmail, FetchTeamInfoWorkpsace }