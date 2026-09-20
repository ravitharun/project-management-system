import React from "react";
import { FiMoreHorizontal, FiUsers } from "react-icons/fi";

type ParticipationType = "vertical" | "horizontal";

interface ParticipationProps {
  type?: ParticipationType;
  showHeader?: boolean;
}

interface Participant {
  id: number;
  name: string;
  role: string;
  initials: string;
  status: "Host" | "Invited";
}

const participants: Participant[] = [
  {
    id: 1,
    name: "Ravi Tharun",
    role: "Backend Developer",
    initials: "RT",
    status: "Host",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Team Leader",
    initials: "RK",
    status: "Invited",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Frontend Developer",
    initials: "PS",
    status: "Invited",
  },
  {
    id: 4,
    name: "Arjun Reddy",
    role: "Full Stack Developer",
    initials: "AR",
    status: "Invited",
  },
  {
    id: 5,
    name: "Sneha Rao",
    role: "UI/UX Designer",
    initials: "SR",
    status: "Invited",
  },
];

const Participation: React.FC<ParticipationProps> = ({
  type = "vertical",
  showHeader = type === "vertical",
}) => {
  return (
    <div className="w-full min-w-0">
      {showHeader && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <FiUsers size={16} />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Participants
              </h3>

              <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                People invited to this meeting
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {participants.length}
          </span>
        </div>
      )}

      {type === "vertical" && (
        <div className="space-y-1.5">
          {participants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
            />
          ))}
        </div>
      )}

      {type === "horizontal" && (
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="w-[min(100%,220px)] min-w-[190px] shrink-0"
            >
              <ParticipantCard participant={participant} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface ParticipantCardProps {
  participant: Participant;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
}) => {
  return (
    <div className="group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm sm:p-4 dark:border-gray-700 dark:bg-gray-800/40">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
            {participant.initials}
          </div>

          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
            {participant.name}
          </p>

          <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">
            {participant.role}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <span
          className={`hidden rounded-full px-2 py-0.5 text-[9px] font-medium sm:inline-flex ${
            participant.status === "Host"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          }`}
        >
          {participant.status}
        </span>

        <button
          type="button"
          aria-label={`More options for ${participant.name}`}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        >
          <FiMoreHorizontal size={15} />
        </button>
      </div>
    </div>
  );
};

export default Participation;