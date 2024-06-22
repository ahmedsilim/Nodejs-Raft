import LeaderElection from "./consensus/leaderElection";
import RaftNode from "./consensus/node";

const nodes = [
    new RaftNode('node1'),
    new RaftNode('node2'),
    new RaftNode('node3')
]

const election = new LeaderElection(nodes);
setInterval(() => {
    const candidate = nodes[Math.floor(Math.random() * nodes.length)];
    candidate.becomeCandidate();
}, 5000)

nodes.forEach(node => {
    node.on('leader', () => {
        console.log(`${node.id} is the leader`);
    });

    node.on('follower', () => {
        console.log(`${node.id} is a follower`);
    });
});