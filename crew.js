// 30 possible gang members
// create list of names
let memberNamePool = [
    "Thor", // 1
    "Iron Man", // 2
    "Starlord", // 3
    "Thanos", // 4
    "Groot", // 5
    "Ant-Man", // 6
    "Wasp", // 7
    "Spiderman", // 8
    "Loki", // 9
    "Gamora", // 10
    "Rocket Raccoon", // 11
    "T'Challa", // 12
    "Vision", // 13
    "Scarlet Witch", // 14
    "Winter Soldier", // 15
    "Black Widow", // 16
    "Hulk", // 17
    "Bruce Banner", // 18
    "Hawkeye", // 19
    "Captain Marvel", // 20
    "War Machine", // 21
    "Nick Fury", // 22
    "Nebula", // 23
    "Drax", // 24
    "Deadpool", // 25
    "Cable", // 26
    "Quicksilver", // 27
    "Wolverine", // 28
    "Adam Warlock", // 29
    "Yondu", // 
]

function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

// /** @param {import(".").NS} ns **/
export async function main(ns) 
{

    ns.disableLog('ALL');
    var members = ns.gang.getMemberNames();

    while(ns.gang.canRecruitMember())
    {
        var possibleNames = memberNamePool.filter(name => !members.includes(name));
        var toRecruit = possibleNames[getRandomInt(possibleNames.length)];
        
        ns.gang.recruitMember(toRecruit);
        await ns.sleep(1);
    }
}