import Countdown from "react-countdown";
import React from "react";

type Props = {
  children: React.ReactNode;
};
type Timeline = {
  days: number, hours: number, minutes: number, seconds: number, completed: boolean
}
function FeatMaintenance({ children }: Props) {
  const liveDate = new Date("2026-05-10T00:00:00");

  const renderer = ({ days, hours, minutes, seconds, completed }: Timeline) => {
    if (completed) {
      return <>{children}</>;
    }

    return (
      <div className="flex flex-col items-center justify-center gap-4 text-white">
        <h2 className="text-2xl font-bold">🚧 Maintenance Mode</h2>

        <div className="flex gap-4 text-3xl font-bold">
          <div>{days}d</div>
          <div>{hours}h</div>
          <div>{minutes}m</div>
          <div>{seconds}s</div>
        </div>

        <p className="text-gray-400">
          We are improving Taskora. Please wait...
        </p>
      </div>
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <Countdown date={liveDate} renderer={renderer} />
    </div>
  );
}

export default FeatMaintenance;