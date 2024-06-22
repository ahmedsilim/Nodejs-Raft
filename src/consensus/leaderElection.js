"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LeaderElection {
    constructor(nodes) {
        this.nodes = nodes;
        this.timeout = null;
        for (const node of this.nodes) {
            node.on('election', () => this.startElection(node));
        }
    }
    startElection(candidate) {
        console.log(`${candidate.id} is starting an election for term ${candidate.currentTerm}`);
        const votes = new Map();
        for (const node of this.nodes) {
            if (node != candidate) {
                const voteGranted = Math.random() > 0.5;
                votes.set(node.id, voteGranted);
            }
        }
        const voteCount = Array.from(votes.values()).filter(vote => vote).length;
        if (voteCount > this.nodes.length / 2) {
            candidate.becomeLeader();
            console.log(`${candidate.id} became the leader for term ${candidate.currentTerm}`);
        }
        else {
            candidate.becomeFollower(candidate.currentTerm);
            console.log(`${candidate.id} became a follower again for term ${candidate.currentTerm}`);
        }
    }
}
exports.default = LeaderElection;
