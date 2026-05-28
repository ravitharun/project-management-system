import { FaProjectDiagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type ProjectsNotFoundPropd = {
    title: string,
    message: string
}

function ProjectsNotfound({ title, message }: ProjectsNotFoundPropd) {

    return (
        <div className="fixed inset-0 flex items-center justify-center pt-20 pl-50">

            <div className="flex flex-col items-center justify-center text-center">

                <div className="bg-blue-100 p-4 rounded-full shadow-md">
                    <FaProjectDiagram className="text-4xl text-blue-600" />
                </div>

                <h2 className="mt-4 text-lg font-semibold text-gray-700">
                    {title}
                </h2>

                <Link to="/projects">

                    <p
                        className="text-sm text-gray-500 mt-1 cursor-pointer transition-all duration-300 hover:text-blue-500 hover:scale-105"
                        title="Create Projects"
                    >
                        {message}
                    </p>

                </Link>

            </div>

        </div>
    )
}

export default ProjectsNotfound