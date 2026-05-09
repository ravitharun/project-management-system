// import React from 'react

import { FaFilePdf } from "react-icons/fa"
import { MdWork } from "react-icons/md"
// type ProjectInfo: any={}

function ProjectDocuments(ProjectInfo: any) {
    console.log(ProjectInfo.ProjectInfo, 'ProjectInfos files')
    const allFiles = ProjectInfo.ProjectInfo.flatMap((item: any) =>
        item.files.map((file: any) => ({
            filename: file.filename,
            addedBy: file.AddedBy
        }))
    );

    console.log(allFiles, 'allFiles');

    return (


        <>


            {/* Project Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">

                {/* Project ID */}
                <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                    <span><MdWork></MdWork> </span>
                    <span>Project ID:</span>
                    <span className="text-blue-600">{ProjectInfo[0]?.projectId}</span>
                </div>

                {/* Table */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Project Documents
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                        <thead className="bg-gray-800 text-white text-left">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3"> File Name</th>
                                <th className="p-3"> Download File</th>
                                <th className="p-3"> View File </th>
                                <th className="p-3"> AddedBy</th>
                            </tr>
                        </thead>

                        <tbody>

                            {ProjectInfo.length == 0 && <>
                                <tr>
                                    <td colSpan={4} className="text-center p-4 text-gray-500">
                                        <div className="flex flex-col items-center py-8 text-gray-400">
                                            <MdWork className="text-4xl mb-2" />
                                            <p>No Project yet</p>
                                        </div>
                                    </td>
                                </tr>
                            </>}
                            {ProjectInfo.ProjectInfo[0]?.files.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center p-4 text-gray-500">
                                        <div className="flex flex-col items-center py-8 text-gray-400">
                                            <FaFilePdf className="text-4xl mb-2" />
                                            <p>No files uploaded yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (

                                // ProjectInfo.ProjectInfo[0].files[0]
                                allFiles.map((file: any, idx: any) => (
                                    <tr key={idx} className="border-t hover:bg-gray-50 transition">
                                        <td className="p-3">{idx + 1}</td>

                                        <td className="p-3 flex items-center gap-2">
                                            {file?.filename}
                                        </td>

                                        <td className="p-3">
                                            <a
                                                href={file?.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline flex items-center gap-1"
                                            >
                                                Download File
                                            </a>
                                        </td>

                                        <td className="p-3">
                                            <a
                                                href={`https://docs.google.com/gview?url=${file?.fileUrl}&embedded=true`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline flex items-center gap-1"
                                            >
                                                View File
                                            </a>
                                        </td>
                                        <td className="p-3">
                                            <span>{file.addedBy[0].Empname}-{file.addedBy[0].EmpRole === 'tl' ? "Team Leader" : file.addedBy[0].EmpRole}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>

            </div>

        </>
    )
}

export default ProjectDocuments