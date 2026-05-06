const mongoose = require("mongoose")
const ProjectFileUload = new mongoose.Schema({

    projectId: { type: String, required: true },
    files: [{
        filename: { type: String, required: true },
        fileUrl: { type: String, required: true },
        AddedBy: [
            {
                Empname: { type: String, required: true },
                EmpId: { type: String, required: true },
                EmpRole: { type: String, required: true }
            }
        ]

    }]

}
    , {
        timeseries: true
    })

module.exports = mongoose.model("ProjectFiles", ProjectFileUload)