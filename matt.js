// This is Matt. He's a Daemon
/** @param {import(".").NS} ns **/
export async function main(ns) 
{
    ns.disableLog('ALL');
    let script_ram = ns.getScriptRam("hax.script");
    while (true)
    {
        // Port 1, for clients registering with the network
        if (ns.peek(1) != "NULL PORT DATA")
        {
            
            let srv = (ns.readPort(1));
            if(ns.serverExists(srv))
            {
                ns.print("Deploying hax to " + srv);
                await ns.scp("hax.script", srv);
                ns.killall(srv);
                let target_count = ~~((ns.getServerMaxRam(srv) - ns.getServerUsedRam(srv))/ script_ram);
                if (target_count > 0)
                {
                    ns.exec("hax.script", srv, target_count);
                }
            }
        }
        await ns.sleep(1000);
    }
}