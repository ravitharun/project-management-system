import { CiMenuKebab } from "react-icons/ci";

function WorkspaceMenu({ setopenProjects, SetBackground, openproject, itm, from }: any) {
    console.log({ setopenProjects, SetBackground, openproject, itm, from },'hi')

    return (
        <>
            <CiMenuKebab fontSize={19} onClick={(e) => {
                e.stopPropagation();
                setopenProjects(
                    openproject === itm?._id ? null : itm?._id
                );
                SetBackground(false);
            }} />
        </>
    )
}

export default WorkspaceMenu