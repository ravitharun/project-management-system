
import { useContext, useState } from "react";
import {
  FiEdit3,
  FiCopy,
  FiLink,
  FiImage,
} from "react-icons/fi"; import {
  BsPinAngle,
  BsShare,
} from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import TaskDetailsWithSubtaskTable from "./TaskDetailsWithSubtaskTable";
import ViewTaskFirst from "../../../Context/FirstTaskView";
function ViewTask({ theme, viewtasks, TaskListView }: any) {

  const TasksView = useContext(ViewTaskFirst);


  if (!TasksView) return null;

  const { Tasks } = TasksView;

  console.log(Tasks);
  console.log(Tasks, 'Tasks')
  const [item, setitem] = useState<any>(
    [
      {
        id: "CMT-101",
        name: "Tharun Ravi",
        role: "Frontend Developer",
        comment:
          "Updated dashboard responsiveness and fixed mobile spacing issues.",
        time: "2h ago",

        replies: [
          {
            replyId: "RPL-201",
            replyToCommentId: "CMT-101",
            name: "Pranav Kumar",
            role: "UI Designer",
            reply:
              "UI looks much cleaner now. Especially tablet view.",
            time: "1h ago",
          },

          {
            replyId: "RPL-202",
            replyToCommentId: "CMT-101",
            name: "Kiran",
            role: "Backend Dev",
            reply:
              "Can you also align the activity cards section?",
            time: "45m ago",
          },
          {
            replyId: "RPL-203",
            replyToCommentId: "CMT-101",
            name: "Ravi",
            role: "Frontend Developer",
            reply:
              "Socket integration is already in progress.",
            time: "20m ago",
          },
        ],
      },

      {
        id: "CMT-102",
        name: "Rahul",
        role: "Project Manager",
        comment:
          "Need realtime notifications for task updates.",
        time: "Yesterday",

        replies: [
          {
            replyId: "RPL-203",
            replyToCommentId: "CMT-102",
            name: "Tharun Ravi",
            role: "Frontend Developer",
            reply:
              "Socket integration is already in progress.",
            time: "20m ago",
          },

        ],
      },
    ]);





  const menuitems = [
    {
      icon: <FiEdit3 className="text-[14px] sm:text-[15px]" />,
      label: "Edit Task",
    },
    {
      icon: <FiCopy className="text-[14px] sm:text-[15px]" />,
      label: "Duplicate Task",
    },
    {
      icon: <BsPinAngle className="text-[14px] sm:text-[15px]" />,
      label: "Pin Task",
    },
    {
      icon: <BsShare className="text-[14px] sm:text-[15px]" />,
      label: "Share Task",
    },
    {
      icon: <FiLink className="text-[14px] sm:text-[15px]" />,
      label: "Copy Link",
    },
    {
      icon: <FiImage className="text-[14px] sm:text-[15px]" />,
      label: "Change Wallpaper",
    },
  ];

  const postComment = () => {
    const replyToCommentId = "CMT-102"

    const postdata = {
      replyId: "RPL-203",
      replyToCommentId: replyToCommentId,
      name: "New user",
      role: "Devops Engineer",
      reply:
        "Node Version Misss Match in Prod",
      time: "a min ago",
    }

    const addrply = item.map((comment: any) => {


      if (comment.id === replyToCommentId) {

        return {
          ...comment,

          replies: [
            ...(comment.replies || []),
            postdata,
          ],
        };
      }

      return comment;
    });
    // setitem
    setitem(addrply)
  }

  return (
    <>


      <div
        className={`
      flex-1 min-w-0
      lg:h-[560px]
      overflow-y-auto
      p-3 sm:p-5 lg:p-6
      ${theme == "Dark" ? "bg-[#111827]" : "bg-white"}
    `}
      >
        {TaskListView.length === 0 ? (
          <div className="h-full flex items-center justify-center px-4">
            <div
              className={`
      w-full max-w-md
      rounded-2xl border
      p-6
      text-center

      ${theme === "Dark"
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white border-gray-200"
                }
    `}
            >
              {/* Icon */}
              <div
                className={`
        mx-auto flex items-center justify-center
        w-14 h-14
        rounded-2xl mb-4

        ${theme === "Dark"
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  }
      `}
              >
                <LuListTodo size={24} />
              </div>

              {/* Heading */}
              <h2
                className={`text-lg font-semibold mb-2 ${theme === "Dark" ? "text-white" : "text-gray-900"
                  }`}
              >
                No Tasks Found
              </h2>

              {/* Description */}
              <p
                className={`text-xs sm:text-sm mb-5 ${theme === "Dark" ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Create your first task to start managing work.
              </p>

              {/* Button */}
              <button
                onClick={() => setOpenTaskModal(true)}
                className="
        inline-flex items-center gap-2
        px-4 py-2
        rounded-xl
        text-sm
        font-medium
        bg-blue-600
        text-white
        hover:bg-blue-700
        transition-all
      "
              >
                <FiPlus size={16} />
                Add Task
              </button>
            </div>
          </div>
        ) :
          (


            <div
              className={`
        rounded-[24px] border
        p-4 sm:p-6
        h-full

        ${theme === "Dark"
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-gray-200 bg-gray-50/50"
                }
      `}
            >

              {/* TOP */}
              {/* ================= TOP HEADER ================= */}

              <div className="flex items-center justify-between gap-3">
                {/* ================= LEFT SIDE ================= */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* ICON */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white shrink-0">                     📁
                  </div>

                  {/* HEADING */}
                  <div className="min-w-0">

                    <h2
                      className={`
         text-lg sm:text-xl font-semibold truncate
          ${theme === "Dark" ? "text-white" : "text-gray-900"}
        `}
                    >
                      {Tasks?.taskName || viewtasks?.taskName || "taskName"}
                    </h2>

                    <p
                      className={`
    text-xs sm:text-sm mt-1 truncate max-w-[500px]
    ${theme === "Dark" ? "text-gray-400" : "text-gray-500"}
`}
                    >
                      {Tasks?.description || viewtasks?.description || "description"}
                    </p>

                    {/* STATUS TAGS */}
                    <div className="flex flex-wrap gap-2 mt-3">

                      <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                        In Progress
                      </span>

                      <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                        Synced
                      </span>

                    </div>

                  </div>

                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="flex items-center gap-3 ml-auto">
                  {/* MENU */}
                  <div className="relative group">

                    <button
                      className={`
          w-11 h-11 rounded-2xl
          flex items-center justify-center
          text-xl transition-all duration-200

          ${theme === "Dark"
                          ? "bg-white/10 text-white hover:bg-white/15"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
        `}
                    >
                      ⋮
                    </button>

                    {/* DROPDOWN */}
                    <div
                      className={`
          absolute right-0 top-14
          w-64 rounded-3xl border shadow-2xl z-50
       
          opacity-0 invisible translate-y-2
          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-y-0
overflow-y-scroll
          transition-all duration-200

          ${theme === "Dark"
                          ? "bg-[#111827] border-white/10"
                          : "bg-white border-gray-200"
                        }
        `}
                    >

                      {/* HEADER */}
                      <div
                        className={`
            px-5 py-4 border-b

            ${theme === "Dark"
                            ? "border-white/10"
                            : "border-gray-200"
                          }
          `}
                      >

                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          Task Actions
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          Manage workspace settings
                        </p>

                      </div>

                      {/* MENU ITEMS */}
                      <div className="p-2">

                        {menuitems.map((item, i) => (
                          <button
                            key={i}
                            className={`
        w-full rounded-2xl
        px-3 sm:px-4
        py-2.5 sm:py-3

        flex items-center gap-3
        transition-all duration-200

        ${theme === "Dark"
                                ? "text-gray-300 hover:bg-white/5"
                                : "text-gray-700 hover:bg-gray-100"
                              }
      `}
                          >

                            {/* ICON */}
                            <div
                              className={`
          w-8 h-8 sm:w-9 sm:h-9
          rounded-xl
          flex items-center justify-center
          shrink-0

          ${theme === "Dark"
                                  ? "bg-white/5"
                                  : "bg-gray-100"
                                }
        `}
                            >
                              <span className="text-[14px] sm:text-[15px]">
                                {item.icon}
                              </span>
                            </div>

                            {/* LABEL */}
                            <div className="flex-1 text-left">

                              <p className="text-[13px] sm:text-sm font-medium">
                                {item.label}
                              </p>

                            </div>

                          </button>
                        ))}

                      </div>

                      {/* DELETE */}
                      <div
                        className={`
            p-2 border-t

            ${theme === "Dark"
                            ? "border-white/10"
                            : "border-gray-200"
                          }
          `}
                      >

                        <button
                          className={`
              w-full rounded-2xl px-4 py-3
              flex items-center gap-4
              text-sm transition-all duration-200

              ${theme === "Dark"
                              ? "text-red-400 hover:bg-red-500/10"
                              : "text-red-600 hover:bg-red-50"
                            }
            `}
                        >

                          <div
                            className={`
                w-9 h-9 rounded-xl
                flex items-center justify-center

                ${theme === "Dark"
                                ? "bg-red-500/10"
                                : "bg-red-100"
                              }
              `}
                          >
                            🗑️
                          </div>

                          Delete Task

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>



              {/* DESCRIPTION */}
             <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-4">

                <div className="xl:col-span-5 rounded-2xl border p-4 bg-white dark:bg-white/[0.02] border-gray-200 dark:border-white/10">
                  <h3 className={`text-sm font-semibold mb-2           ${theme === "Dark" ? "text-white" : "text-gray-900"}
`}>
                    Description
                  </h3>
                  <p className={`text-sm leading-7           ${theme === "Dark" ? "text-white" : "text-gray-900"}
`}>
                    {Tasks?.description || viewtasks?.description || "description"}
                  </p>
                </div>
                
              </div>



              {/* Sub Task */}
              <div
                className={`
    mt-26 mx-auto rounded-[28px] border overflow-hidden backdrop-blur-xl
    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
    w-full max-w-6xl
    ${theme === "Dark"
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-gray-200 bg-white/70"}
  `}
              >
                <div
                  className={`
      px-4 sm:px-5 py-4 border-b
      backdrop-blur-xl
      ${theme === "Dark"
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-gray-200 bg-gray-50/70"}
    `}
                >
                  <TaskDetailsWithSubtaskTable theme={theme} viewtasks={viewtasks} />
                </div>
              </div>

              {/* ACTIVITY */}
              <div className="mt-22">
                <h3 className={`text-sm font-semibold mb-3            ${theme === "Dark" ? "text-white" : "text-gray-900"}
`}>
                  Recent Activity
                </h3>

                <div className="space-y-3">
                  {[
                    { title: "Socket integration updated", time: "2 hours ago" },
                    { title: "Dashboard widgets improved", time: "Yesterday" },
                    { title: "Responsive issues fixed", time: "Mobile view" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between gap-3 border rounded-2xl px-4 py-3 bg-white dark:bg-white/[0.02] border-gray-200 dark:border-white/10"
                    >
                      <div className="flex gap-3 min-w-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">Workspace activity update</p>
                        </div>
                      </div>

                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* COMMENTS SECTION */}
              <div className="mt-8">

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Comments
                  </h3>

                  <span className="text-xs text-gray-500">
                    4 Comments
                  </span>
                </div>

                {/* COMMENTS LIST */}
                <div className="space-y-4">
                  {/* REPLIES */}


                  <div className="mt-5 ml-4 sm:ml-10 border-l border-gray-200 dark:border-white/10 pl-4 space-y-4">
                    <div className="space-y-6">

                      {item.map((comment: any) => {

                        const replies = comment.replies?.filter(
                          (reply: any) => reply.replyToCommentId === comment.id
                        );

                        return (

                          <div
                            key={comment.id}
                            className={`
          rounded-3xl border p-4 sm:p-5

          ${theme === "Dark"
                                ? "border-white/10 bg-white/[0.03]"
                                : "border-gray-200 bg-white"
                              }
        `}
                          >

                            {/* MAIN COMMENT */}
                            <div className="flex gap-3">

                              {/* AVATAR */}
                              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center shrink-0 font-semibold">
                                {comment?.name?.charAt(0)}
                              </div>

                              {/* CONTENT */}
                              <div className="flex-1 min-w-0">

                                <div className="flex flex-wrap items-center gap-2">

                                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {comment.name}
                                  </h4>

                                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                    {comment.role}
                                  </span>

                                  <span className="text-xs text-gray-500">
                                    {comment.time}
                                  </span>

                                </div>

                                <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                  {comment.comment}
                                </p>

                                {/* ACTIONS */}
                                <div className="flex items-center gap-4 mt-3">

                                  <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                                    Reply
                                  </button>

                                  <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    Like
                                  </button>

                                </div>

                              </div>

                            </div>

                            {/* REPLIES */}
                            {replies?.length > 0 && (

                              <div className="mt-5 ml-4 sm:ml-10 border-l border-gray-200 dark:border-white/10 pl-4 space-y-4">

                                {replies.map((reply: any) => (
                                  <div
                                    key={reply.replyId}
                                    className={`
                  rounded-2xl border p-4

                  ${theme === "Dark"
                                        ? "border-white/10 bg-[#0f172a]"
                                        : "border-gray-200 bg-gray-50"
                                      }
                `}
                                  >

                                    <div className="flex gap-3">

                                      {/* REPLY AVATAR */}
                                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shrink-0 text-sm font-semibold">
                                        {reply.name.charAt(0)}
                                      </div>

                                      {/* REPLY CONTENT */}
                                      <div className="flex-1 min-w-0">

                                        <div className="flex flex-wrap items-center gap-2">

                                          <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {reply.name}
                                          </h5>

                                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                                            {reply.role}
                                          </span>

                                          <span className="text-xs text-gray-500">
                                            {reply.time}
                                          </span>

                                        </div>

                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
                                          {reply.reply}
                                        </p>

                                        {/* REPLY ACTIONS */}
                                        <div className="flex items-center gap-4 mt-3">

                                          <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                                            Reply
                                          </button>

                                          <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                            Like
                                          </button>

                                        </div>

                                      </div>

                                    </div>

                                  </div>
                                ))}

                              </div>
                            )}

                          </div>
                        );
                      })}

                    </div>


                  </div>

                </div>

                {/* TaskDetailsWithSubtaskTable */}

                {/* ADD COMMENT */}
                <div
                  className={`
      mt-6 rounded-3xl border p-4

      ${theme === "Dark"
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-gray-200 bg-white"
                    }
    `}
                >

                  <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
                    Add Comment
                  </h4>

                  <textarea
                    rows={4}
                    placeholder="Write your comment here..."
                    className={`
        w-full rounded-2xl border px-4 py-3 text-sm resize-none outline-none

        ${theme === "Dark"
                        ? "bg-[#0f172a] border-white/10 text-white placeholder:text-gray-500"
                        : "bg-gray-50 border-gray-200 text-black placeholder:text-gray-400"
                      }
      `}
                  />

                  <div className="flex justify-end mt-4">

                    <button
                      className="
          h-10 px-5 rounded-xl text-sm font-medium
          bg-blue-600 text-white hover:bg-blue-700
        "
                      onClick={postComment}
                    >
                      Post Comment
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )}
      </div >


    </>
  )
}

export default ViewTask
