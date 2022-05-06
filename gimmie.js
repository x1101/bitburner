/** @param {import(".").NS} ns **/
export async function main(ns) 
{
    ns.disableLog('ALL');

    let max_ram = ns.getPurchasedServerMaxRam();
    // Can I do this with exponents so its easier ??
    let rams = [
                max_ram/Math.pow(2,18),
                max_ram/Math.pow(2,17),
                max_ram/Math.pow(2,15),
                max_ram/Math.pow(2,14),
                max_ram/Math.pow(2,13),
                max_ram/Math.pow(2,12),
                max_ram/Math.pow(2,11),
                max_ram/Math.pow(2,10),
                max_ram/Math.pow(2,9),
                max_ram/Math.pow(2,8),
                max_ram/Math.pow(2,7),
                max_ram/Math.pow(2,6),
                max_ram/Math.pow(2,5),
                max_ram/Math.pow(2,4),
                max_ram/Math.pow(2,3),
                max_ram/Math.pow(2,2),
                max_ram/Math.pow(2,1),
                max_ram];
    for (const ram of rams)
    {
        ns.print("Building fleet of " + ram + "GB systems");
        for (let i = 0 ; i < ns.getPurchasedServerLimit(); i++)
        {
            let name = "pserv-" + i;
            ns.print("Need $" + ns.getPurchasedServerCost(ram) + " . Have $" + ns.getServerMoneyAvailable("home"));
            while (ns.getPurchasedServerCost(ram) > ns.getServerMoneyAvailable("home")) 
            {
                await ns.sleep(9000);
            }
            if (ns.serverExists(name))
            {
                if (ns.getServerMaxRam(name) < ram)
                {
                    ns.print(name + " not at max specs, deleting and recreating");
                    ns.killall(name);
                    await ns.sleep(3000);
                    await ns.deleteServer(name);
                    await ns.sleep(3000);
                    await ns.purchaseServer(name, ram);
                    await ns.sleep(3000);
                    await ns.scp("ben.js", name);
                    await ns.sleep(3000);
                    ns.exec("ben.js", name);
                }
            }
            else
            {
                await ns.purchaseServer(name, ram);
                await ns.scp("ben.js", name);
                ns.exec("ben.js", name);
            }

        }
    }
}