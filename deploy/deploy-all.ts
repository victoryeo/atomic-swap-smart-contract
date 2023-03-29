import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
const crypto = require('crypto');

const func: DeployFunction = async function ({
    deployments,
    getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    let args: any[] = []
    const { deploy } = deployments
    const { deployer, recipient } = await getNamedAccounts()
    console.log("deploy from account", deployer)
    console.log("htlc recipient", recipient)

    args[0] = "T_NAME"
    args[1] = "T_SYMBOL"
    const ttoken = await deploy("TToken", {
        from: deployer,
        args: args,
        log: true,
    })

    const hashKey = crypto.createHash('sha256', "secret").digest('hex')
    console.log("token address", ttoken.address)
    console.log("hashkey", hashKey)
    args[0] = recipient  // htlc recipient address
    args[1] = ttoken.address
    args[2] = 1
    args[3] = '0x'+hashKey
    await deploy("HTLC", {
        from: deployer,
        args: args,
        log: true,
    })
}

export default func

func.tags = ["All"]
