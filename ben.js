// This is Ben. Ben talks to Matt. Matt is a Daemon
/** @param {import(".").NS} ns **/
export async function main(ns) 
{
    await ns.tryWritePort(1, ns.getHostname());
}