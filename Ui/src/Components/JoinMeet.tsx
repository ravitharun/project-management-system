'use client';
import { useEffect } from 'react';
import {
    ControlBar,
    RoomAudioRenderer,
    useSession,
    SessionProvider,


} from '@livekit/components-react';
import { TokenSource } from 'livekit-client';
import '@livekit/components-styles';
import JoinMettings from './JoinMettings';

const tokenSource = TokenSource.developmentTokenServer('<your development token server id>');

export default function JoinMeet() {
    const session = useSession(tokenSource, { agentName: 'my-agent' });



    // Connect to session
    useEffect(() => {
        session.start();
        return () => {
            session.end();
        };
    }, []);

    return (
        <SessionProvider session={session}>
            <div data-lk-theme="default" style={{ height: '100vh' }}>
                {/* Your custom component with basic video agent functionality. */}
                <JoinMettings></JoinMettings>
                {/* Controls for the user to start/stop audio and disconnect from the session */}
                <ControlBar controls={{ microphone: true, camera: false, screenShare: false }} />
                {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
                <RoomAudioRenderer />
            </div>
        </SessionProvider>
    );
}
