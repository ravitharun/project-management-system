import { FaProjectDiagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
type ProjectsNotFoundPropd = {
    title: string,
    message: string

}

function ProjectsNotfound({ title, message }: ProjectsNotFoundPropd) {
    return (


        <>


            <div className="mt-25 flex flex-col items-center justify-center text-center py-10">

                <div className="bg-blue-100 p-4 rounded-full shadow-md">
                    <FaProjectDiagram className="text-4xl text-blue-600" />
                </div>

                <h2 className="mt-4 text-lg font-semibold text-gray-700">
                    {/* {No Project Progress Found} */}
                    {title}
                </h2>
                <Link to="/projects">

                    <p
                        className="text-sm text-gray-500 mt-1 cursor-pointer transition-all duration-300 hover:text-blue-500 hover:scale-105"
                        title="Create Projects"
                    >
                        {/* Start creating projects to track progress here. */}
                        {message}
                        
                    </p>
                </Link>

            </div>
        </>
    )
}

export default ProjectsNotfound