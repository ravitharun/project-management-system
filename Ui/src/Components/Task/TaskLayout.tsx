import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../Navbar"
import CreatedspaceData from "../../Context/CreatedWorkspace";
import SharespaceView from "../../Context/ShareViewContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MinAndMaxWorkspaceView from "./TaskBoard/MinAndMaxWorkspaceview";
import ShareMinAndMaxWorkspaceView from "../Share/ShareMinAndMaxWorkspaceView";
import bgthemeContext from "../../Context/ThemeContext";

function TaskLayout() {
     const context = useContext(bgthemeContext);
    const { theme }: any = context
    const stats = useLocation()

    const navigate = useNavigate()
    const w = stats?.state?.data

    console.log(w, 'dd')

    useEffect(() => {


        const checkData = () => {
            if (w == undefined) {
               return navigate("/")
            }
        }
        checkData()
    }, [w])

    const CreatedSpaceJson = useContext(CreatedspaceData);
    const CreatedSharespaceView = useContext(SharespaceView);
    const [ismaxAndMin, setMaxAndMin] = useState<boolean>(false)
    const [isSetBackground, SetBackground] = useState<boolean>(false);
    console.log(isSetBackground, 'isSetBackground')
    const [openProject, setOpenProject] = useState<string | null>(null);

    const workspaceMenuRef = useRef<HTMLDivElement | null>(null);

    const { SpaceJson }: any = CreatedSpaceJson;
    console.log(SpaceJson, 'SpaceJson')
    const { SpaceJsonView, setSpaceJsonView }: any = CreatedSharespaceView;

    const workspace = w
    const [CurrentView, setCurrentView] = useState("");


    useEffect(() => {
        const ChooseBoard = () => {

            const TaskBoardType = workspace?.name == "Scrum" ? "Board" : "Summary"
            setCurrentView(TaskBoardType)


        }
        ChooseBoard()
    }, [workspace])



    const HandelShare = async (id: number) => {
        try {

            const url = `${window.location.origin}/shared/ViewWorkspace/${id}`;
            const shareData = {
                title: "Taskaro Workspace",
                text: ` Join my Taskaro workspace
    
    Collaborate on projects, tasks, and productivity in one place.
    
    ${url}/shared/ViewWorkspace?id=${id}`,
            };

            await navigator.share(shareData);

        } catch (error) {
            console.log(error);
        }
    };










    useEffect(() => {

        async function fetchWorkspace() {
            try {
                const res = await axios.get(
                    `http://localhost:5000/workspace/share?id=6a1e8587848d4471d14a554a`
                );
                // console.log(res.data.data, 'res.data.data')
                setSpaceJsonView(res.data.data);
            } catch (err) {
                console.log(err);
            }
            // console.log("make it []")
            setSpaceJsonView([]);
        }

        fetchWorkspace();
    }, []);


















    useEffect(() => {

        const handleKeyDown = (e: any) => {
            if (e.key === "o") {
                return setMaxAndMin(true);
            }
            else if (e.key === 'i' || e.key == "I") {

                return setMaxAndMin(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const columns =
        SpaceJsonView || workspace?.columns?.map((c: any) => c.name) ||
        SpaceJsonView || workspace?.workspaceSetup?.statuses || [
            "Backlog",
            "To Do",
            "In Progress",
            "In Review",
            "Done",
        ];

    const tasks =
        SpaceJsonView?.tasks || workspace?.tasks || [
            {
                id: 1,
                title: "Setup project structure",
                status: "Backlog",
                priority: "Low",
            },
            {
                id: 2,
                title: "Design UI system",
                status: "To Do",
                priority: "Medium",
            },
            {
                id: 3,
                title: "Connect API",
                status: "In Progress",
                priority: "High",
            },
            {
                id: 4,
                title: "Fix bugs",
                status: "In Review",
                priority: "Medium",
            },
            {
                id: 5,
                title: "Deploy",
                status: "Done",
                priority: "Low",
            },
        ];
    console.log(tasks, columns, tasks, 'Dummytasks')

    const priorityColor = (p: string) => {
        if (p === "High") return "bg-red-500";
        if (p === "Medium") return "bg-yellow-500";
        return "bg-green-500";
    };
    console.log(priorityColor, 'priorityColor')
    const handleProjectSetting = (CreatedWorkSpace: any) => {
        if (!CreatedWorkSpace) return;

        navigate("/projectSettings", {
            state: {
                CreatedWorkSpace,
            },
        });
    };

    if (workspace?.length === 0) {
        return "hi"
    }


    const handelMaximizeAndMinPoup = () => {
        setMaxAndMin((prev) => !prev)

    }


    return (
        <>


            <Sidebar ></Sidebar>
            <div className="mt-2 ml-64">

                {ismaxAndMin ?
                    <>

                        {SpaceJsonView?.length == 0 ?
                            <MinAndMaxWorkspaceView HandelShare={HandelShare} handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} workspace={workspace} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
                                setCurrentView
                            } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin}></MinAndMaxWorkspaceView> :

                            <ShareMinAndMaxWorkspaceView HandelShare={HandelShare} handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} workspace={workspace} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
                                setCurrentView
                            } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin} />
                        }
                    </>




                    :



                    <>


                        {SpaceJsonView?.length == 0 ?
                            <MinAndMaxWorkspaceView HandelShare={HandelShare} handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} workspace={workspace} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
                                setCurrentView
                            } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin}></MinAndMaxWorkspaceView> : <ShareMinAndMaxWorkspaceView HandelShare={HandelShare} handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} workspace={workspace} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
                                setCurrentView
                            } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin} />
                        }
                    </>
                }
            </div>


        </>)
}

export default TaskLayout