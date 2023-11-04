"use client"
import { useState } from "react";
const { ethers } = require("ethers");




export default function ConnectButton() {
    
    const [provider, setProvider] = useState(null)

    const connect = async () => {
		window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let account = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log(account[0])
        setProvider(window.ethereum)
	}

    return (
        <div>
            {!provider ? (
              <button 
                className='w-full h-full text-black'
                onClick={() => connect()}>Connect a wallet</button>
            ) : (
              <p className='text-black'>Connected with {"0xjs3.."}</p>  
            )}
        </div>
    )
}