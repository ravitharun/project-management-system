import { useContext, useEffect, useRef, useState } from "react";
import WorkspaceData from "../../../Context/workspaceData";
import WorkspaceViwe from "../../WorkspaceViwe";
import CreatedspaceData from "../../../Context/CreatedWorkspace";


import SetWork from "../../SetWork";

import { useNavigate } from "react-router-dom";

import MinAndMaxWorkspaceView from "./MinAndMaxWorkspaceview";
import SharespaceView from "../../../Context/ShareViewContext";
import ShareMinAndMaxWorkspaceView from "../../Share/ShareMinAndMaxWorkspaceView";
import axios from "axios";






function ViewWorkspace({ theme }: any) {

  const workspaceProvider = useContext(WorkspaceData);
  const CreatedSpaceJson = useContext(CreatedspaceData);
  const CreatedSharespaceView = useContext(SharespaceView);
  const [ismaxAndMin, setMaxAndMin] = useState<boolean>(false)


  const [isSetBackground, SetBackground] = useState<boolean>(false);
  const [openProject, setOpenProject] = useState<string | null>(null);

  const workspaceMenuRef = useRef<HTMLDivElement | null>(null);

  const { SpaceJson }: any = CreatedSpaceJson;
  const { work, setwork }: any = workspaceProvider;
  const { SpaceJsonView, setSpaceJsonView }: any = CreatedSharespaceView;

  const workspace = work
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


  const navigate = useNavigate();








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

  if (work?.length === 0) {
    return <WorkspaceViwe theme={theme} SpaceJson={SpaceJson} />;
  }


  const handelMaximizeAndMinPoup = () => {
    setMaxAndMin((prev) => !prev)

  }




  return (

    <>

      {isSetBackground && (
        <SetWork
          SetBackground={SetBackground}
          id={workspace._id}
          theme={theme}
        />
      )}
      {ismaxAndMin ?
        <>

          {SpaceJsonView?.length == 0 ?
            <MinAndMaxWorkspaceView HandelShare={HandelShare} handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} work={work} workspace={workspace} setwork={setwork} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
              setCurrentView
            } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin}></MinAndMaxWorkspaceView> :

            <ShareMinAndMaxWorkspaceView HandelShare={HandelShare} handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} work={work} workspace={workspace} setwork={setwork} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
              setCurrentView
            } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin} />
          }
        </>




        :



        <>


          {SpaceJsonView?.length == 0 ?
            <MinAndMaxWorkspaceView HandelShare={HandelShare} handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} work={work} workspace={workspace} setwork={setwork} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
              setCurrentView
            } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin}></MinAndMaxWorkspaceView> : <ShareMinAndMaxWorkspaceView HandelShare={HandelShare} handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} work={work} workspace={workspace} setwork={setwork} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
              setCurrentView
            } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin} />
          }
        </>
      }


      {/* <Shareview></Shareview> */}
    </>
  );
}

export default ViewWorkspace;