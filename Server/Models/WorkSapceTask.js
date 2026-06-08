const mongosse = require("mongoose")

const TaskToAssiginMemeber = new mongosse.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true ,   index: true
},

})

const Subatask = new mongosse.Schema([{
    TaskId: { type: String, required: true, unique: true ,   index: true
},
    taskName: { type: String, required: true, },
    taskPriority: { type: String, required: true },
    AssiginMember: TaskToAssiginMemeber,
    SubTaskStatus: { type: String, default: "In progress" },

}])

const WorkSpaceTask = new mongosse.Schema({
    workSpaceId: { type: String, required: true  , index: true},
    Taskid: { type: String, required: true  , index: true},
    TaskName: { type: String, required: true },
    TaskNameDescprition: { type: String, required: true },
    SubTask: [Subatask],
    Files: [{ type: String }],
    Links: [{
        Link: { type: String },
        LinkName: { type: String },

    }],
    
}, {
    timeseries: true
})



module.exports=new mongosse.model("WorkSpaceTasks",WorkSpaceTask)