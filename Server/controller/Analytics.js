const FetchView=async(req,res)=>{



    try {
        const {projectId}=req.query
        console.log(projectId,'projectId');
        
    } catch (error) {


        return res.status(500).json({message:"Server Error"})
        
    }
}


module.exports={FetchView}