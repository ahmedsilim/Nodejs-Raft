import { State } from "./state";
import { EventEmitter } from 'events';

class RaftNode extends EventEmitter {
    id: string;
    state: State;
    currentTerm: number;
    votedFor: string | null;
    log: any[];
    
    constructor(id: string){
        super();
        this.id = id;
        this.state = State.Follower;
        this.currentTerm = 0;
        this.votedFor = null;
        this.log = [];
    }

    becomeCandidate(){
        this.state = State.Candidate;
        this.currentTerm +=1;
        this.votedFor = this.id;
        this.emit('election')
    }

    becomeLeader(){
        this.state = State.Leader;
        this.emit('Leader');
    }

    becomeFollower(term: number){
        this.state = State.Follower;
        this.currentTerm = term;
        this.votedFor = null;
    }
}

export default RaftNode;

