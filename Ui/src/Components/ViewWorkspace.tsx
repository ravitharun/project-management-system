import { useContext, useEffect, useRef, useState } from "react";
import WorkspaceData from "../Context/workspaceData";
import WorkspaceViwe from "./WorkspaceViwe";
import CreatedspaceData from "../Context/CreatedWorkspace";

import SetWork from "../Components/SetWork";

import { useNavigate } from "react-router-dom";

import MinAndMaxWorkspaceView from "./MinAndMaxWorkspaceview";


function ViewWorkspace({ theme }: any) {
  const workspaceProvider = useContext(WorkspaceData);
  const CreatedSpaceJson = useContext(CreatedspaceData);
  const [ismaxAndMin, setMaxAndMin] = useState<boolean>(false)
  const [CurrentView, setCurrentView] = useState<string>("Board");

  const [isSetBackground, SetBackground] = useState<boolean>(false);
  const [openProject, setOpenProject] = useState<string | null>(null);

  const workspaceMenuRef = useRef<HTMLDivElement | null>(null);

  const { SpaceJson }: any = CreatedSpaceJson;
  const { work, setwork }: any = workspaceProvider;

  const workspace = work;
  useEffect(() => {

    const handleKeyDown = (e:any) => {
      if (e.key === "Shift") {
        return setMaxAndMin(true);
      }
      else if (e.key === 'i' || e.key == "I") {

        return setMaxAndMin(false);
      }
      else if(e.key=="m"){return  }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const navigate = useNavigate();

  const columns =
    workspace?.columns?.map((c: any) => c.name) ||
    workspace?.workspaceSetup?.statuses || [
      "Backlog",
      "To Do",
      "In Progress",
      "In Review",
      "Done",
    ];

  const tasks =
    workspace?.tasks || [
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

          <MinAndMaxWorkspaceView handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} work={work} workspace={workspace} setwork={setwork} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
            setCurrentView
          } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin}></MinAndMaxWorkspaceView>

        </>




        :

        <MinAndMaxWorkspaceView handelMaximizeAndMinPoup={handelMaximizeAndMinPoup} theme={theme} work={work} workspace={workspace} setwork={setwork} setOpenProject={setOpenProject} openProject={openProject} workspaceMenuRef={workspaceMenuRef} SetBackground={SetBackground} CurrentView={CurrentView} setCurrentView={
          setCurrentView
        } handleProjectSetting={handleProjectSetting} ismaxAndMin={ismaxAndMin}></MinAndMaxWorkspaceView>
      }
    </>
  );
}

export default ViewWorkspace;