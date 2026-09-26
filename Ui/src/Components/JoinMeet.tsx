'use client';
import { useEffect, useState } from 'react';
import {
    ControlBar,
    LiveKitRoom,
    RoomAudioRenderer,
    useSession,


} from '@livekit/components-react';
import { Room, TokenSource } from 'livekit-client';
import '@livekit/components-styles';
import JoinMettings from './JoinMettings';
import axios from 'axios';
import { getuserInfo } from './LocalStorage';
import { ShowToast } from './toastHelper';

const tokenSource = TokenSource.developmentTokenServer('<your development token server id>');

export default function JoinMeet() {

    const [IsJoined, setIsJoined] = useState(false);

    const [room] = useState(() => new Room());

    useEffect(() => {
        const connectRoom = async () => {
            try {
                const meetuid = '122'
                const response = await axios.post(
                    "http://localhost:5000/api/Metting/livekit-token",
                    {
                        roomName: `meeting-${meetuid}`,
                        participantName: JSON.parse(getuserInfo).Username,
                        userID: JSON.parse(getuserInfo)._id,
                    }
                );

                await room.connect(response.data.url, response.data.token);
                setIsJoined(true)
            } catch (error: any) {
                ShowToast(error?.response?.data?.message, 400, 'error')
                setIsJoined(false)
                console.error("LiveKit connection error:", error);
            }
        };

        connectRoom();

        return () => {
            room.disconnect();
        };
    }, [room]);

    useEffect(() => {
        return () => {
            room.disconnect();
        };
    }, [room]);

    return (
        <div data-lk-theme="default" style={{ height: '100vh' }}>
            <LiveKitRoom
                room={room}
                connect={false}
            >
                {IsJoined ? (
                    <JoinMettings room={room} />
                ) : (
                    <div className="flex h-screen items-center justify-center">
                        <div className="rounded-lg bg-gray-900 p-6 text-center">
                            <h2 className="text-lg font-semibold text-white">
                                Unable to Join Meeting
                            </h2>

                            <p className="mt-2 text-gray-400">
                                You are not allowed to join this meeting.
                            </p>

                            <button
                                onClick={() => window.history.back()}
                                className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                )}
                <ControlBar
                    controls={{
                        microphone: true,
                        camera: false,
                        screenShare: false
                    }}
                />

                <RoomAudioRenderer />
            </LiveKitRoom>
        </div>
    );
}
