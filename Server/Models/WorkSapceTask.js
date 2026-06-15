const mongosse = require("mongoose")

const TaskToAssiginMemeber = new mongosse.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true ,   index: true
},

})

const Subatask = new mongosse.Schema([{
    TaskId: { type: String, unique: true ,   index: true
},
    taskName: { type: String,  },
    taskPriority: { type: String, },
    AssiginMember: TaskToAssiginMemeber,
    SubTaskStatus: { type: String, default: "In progress" },

}])

const WorkSpaceTask = new mongosse.Schema({
    projectid: { type: String, required: true  , index: true},
    Taskid: { type: String, required: true  , index: true,default:"Tasks"},
    taskName: { type: String, required: true },
    description: { type: String, required: true },
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