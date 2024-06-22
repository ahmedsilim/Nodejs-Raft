import RaftNode from "./node";

class LeaderElection {
    nodes: RaftNode[];
    timeout: NodeJS.Timeout | null;
    
    constructor(nodes: RaftNode[]) { 
        this.nodes = nodes;
        this.timeout = null;

        for (const node of this.nodes) {
            node.on('election', () => this.startElection(node))
        }
    }
    startElection(candidate: RaftNode){
        console.log(`${candidate.id} is starting an election for term ahmed ${candidate.currentTerm}`);

        const votes = new Map<string, boolean>();
        for(const node of this.nodes) {
            if(node != candidate){
                const voteGranted = Math.random() > 0.5;
                votes.set(node.id, voteGranted)
            }
        }
        const voteCount = Array.from(votes.values()).filter(vote => vote).length;
        if(voteCount > this.nodes.length / 2){
            candidate.becomeLeader();
            console.log(`${candidate.id} became the leader for term samir ${candidate.currentTerm}`);
        }else {
            candidate.becomeFollower(candidate.currentTerm);
            console.log(`${candidate.id} became a follower again for term aya ${candidate.currentTerm}`);
        }

    }
}

export default LeaderElection