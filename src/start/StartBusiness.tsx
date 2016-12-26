import * as React from 'react';
import * as classnames from 'classnames';
import { Link } from 'react-router';

import { observable, autorun, extendObservable, computed } from 'mobx';
import { observer } from 'mobx-react';

import { nonEmpty, email, atLeast, atMost, Input, Textarea, Form } from '../tools/Input';
import { layoutState as layout } from '../tools/Layout';
//import ipfs from '../IpfsStore';
import db from '../IpfsApiStore';


export class StartBusinessState {
    @observable name: string;
    @observable description: string;
    @observable email: string;
    @observable phoneNumber: string;
    @observable urPicture: string;
    @observable nodeError: string;
}

export const start = new StartBusinessState();


@observer
export class StartBusiness extends React.Component< any, {isValid: boolean} > {

    @observable isValid: boolean = false;

    uploadDataToIPFS() {
        if( !this.isValid ) return this.initForm();
        db.room.put({
            _id: "ambrosia",
            doc: start.name,
        });
    }

    componentWillMount() {
        layout.title = 'Set your room up';
        // observe isValid and set up the toolbar relatively
        autorun( _ => {
            if( this.isValid ) {
                layout.toolBar = (
                    <Link 
                        className="button"
                        to="/room"
                    >Add some stuffs
                    </Link>
                );
            } else {
                layout.toolBar = null;
            }
        } );
    }

    /** this method is used to init required form values */
    initForm() {
        Object.keys( start ).map( key => {
            if(start[key] === undefined) start[key] = '';
        } )
    }

    onDrop(e: any): void {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.dataTransfer.files[0]);
        fileReader.onloadend = (e: any) => {
            console.log(e);
        }
    }

    getDataFromIpfs() {
        db.room.get( db.nodeID ).map( (e: any) => console.log(e) );
        const all = db.room.query( (doc: any) => !!doc.name );
        console.log(all);
    }

    render() {
        return (
            <div className="start-business" onDrop={ e => this.onDrop(e)} onDragOver={e => e.preventDefault()}>
                <div className="intro-layer"/>
                <Form validityChange={ isValid => this.isValid = isValid } >
                    <Input
                        id="name"
                        type="text"
                        label="Business Name"
                        value={start.name}
                        onChange={ (e: any) => start.name = e.currentTarget.value }
                        constraints={ [ nonEmpty() ]}
                    />
                    <Textarea
                        id="description"
                        label="Put a brief description on what your business offer"
                        value={ start.description }
                        onChange={ (e: any) => start.description = e.currentTarget.value }
                        constraints={ [ atLeast(10), atMost(200) ]} 
                    />
                    <Input
                        id="email"
                        label="Email Address"
                        type='email'
                        value={start.email}
                        onChange={ (e:any) => start.email = e.currentTarget.value }
                        constraints={ [ email() ] }
                    />
                    <Input
                        id="phone number"
                        label="Phone Number"
                        type="tel"
                        value={start.phoneNumber}
                        onChange={ (e: any) => start.phoneNumber = e.currentTarget.value }
                    />
                </Form>
            </div>
        );
    }
}

import './StartBusiness.scss';