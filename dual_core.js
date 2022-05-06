/** @param {import(".").NS} ns **/
export async function main(ns) 
{
    ns.disableLog('ALL');

    server_list = [];
    let deploy_script = "ben.js"
    let script_ram = getScriptRam(deploy_script);

    node = getHostname();
    res = scan(node);
    res.push(node);
    for (i=0; i < res.length; i++)
    {
        srv = res[i];
        deep_res = scan(srv);
        for(j=0; j < deep_res.length; j++)
        {
            if (!res.includes(deep_res[j])) { res.push(deep_res[j]); }    
        }
        if (hasRootAccess(srv))
        {
            continue;
        }
        switch (getServerNumPortsRequired(srv))
        {
            case 5: 
                if(fileExists("SQLInject.exe", "home")) { sqlinject(srv); }
                else { break; }
            case 4:
                if(fileExists("HTTPWorm.exe","home")) { httpworm(srv); }
                else { break; }
            case 3:
                if (fileExists("relaySMTP.exe", "home")) { relaysmtp(srv); }
                else { break; }
            case 2:
                if (fileExists("FTPCrack.exe","home")) { ftpcrack(srv); }
                else { break; }
            case 1:
                if (fileExists("BruteSSH.exe", "home")) { brutessh(srv); }
                else { break; }
            case 0:
                nuke(srv);
                print("root on " + srv + " get");
                dropper(srv);
                target_count = ~~((getServerMaxRam(srv) - getServerUsedRam(srv))/ script_ram);
                if (target_count > 0 && !isRunning(deploy_script, srv))
                {
                    scp(deploy_script, srv);
                    exec(deploy_script, srv, target_count);   
                }
                print("Dropped " + deploy_script + " to " + srv);
            default:
                break;
        }
    }
}