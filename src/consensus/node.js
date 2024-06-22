"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const events_1 = require("events");
class RaftNode extends events_1.EventEmitter {
    constructor(id) {
        super();
        this.id = id;
        this.state = state_1.State.Follower;
        this.currentTerm = 0;
        this.votedFor = null;
        this.log = [];
    }
    becomeCandidate() {
        this.state = state_1.State.Candidate;
        this.currentTerm += 1;
        this.votedFor = this.id;
        this.emit('election');
    }
    becomeLeader() {
        this.state = state_1.State.Leader;
        this.emit('Leader');
    }
    becomeFollower(term) {
        this.state = state_1.State.Follower;
        this.currentTerm = term;
        this.votedFor = null;
    }
}
exports.default = RaftNode;
