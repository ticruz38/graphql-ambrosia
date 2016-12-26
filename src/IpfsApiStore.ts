import { observable } from 'mobx';

declare const require: any;

require('./graphql-client/schema/root');


const Orbitdb = require('orbit-db');
const IpfsApi = require('@haad/ipfs-api');


class IpfsStore {
    nodeID: string;
    node: any;
    room: any;
    stuffs: any;
    chat: any;
    constructor() {
        this.node = new IpfsApi();
        this.nodeID = this.node.id().then( (config: any) => this.nodeID = config.id );
        const orbitdb = new Orbitdb( this.node );
        this.room = orbitdb.docstore('room');
        this.stuffs = orbitdb.docstore('stuffs')
    }
}

export default new IpfsStore();
