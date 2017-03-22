import * as React from "react";

import { RoomState } from 'routes/rooms/fullscreenRoom/FullScreenRoom';
import Caddy from './visuals/caddy';

type props = {
    roomState: RoomState
}

export class RoomContent extends React.Component<props, any> {
    render() {
        const { roomState } = this.props;
        return (
            <div className="room-content-wrapper">
                <div className="room-content">
                    {Object.keys( roomState.roomCategories ).map( key => (
                        <div key={key} className="category">
                            <h4>{key}</h4>
                            <div key={key} className='stuffs'>
                                { roomState.roomCategories[key].map( s =>
                                    <div key={s._id} className="stuff" onClick={_ => roomState.order.stuffIds.push( s._id )}>
                                        <h4>
                                            <span>{s.name}</span>
                                        </h4>
                                        <div>{s.description}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) )}
                </div>
                { roomState.stuffs.length ? <Caddy roomState={roomState} /> : <span /> }
            </div>
        );
    }
}


export default {
    path: '',
    component: RoomContent
}

import './RoomContent.scss';