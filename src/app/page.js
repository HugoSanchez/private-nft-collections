"use client"
import Image from 'next/image';
// import Lit from '../../lib/lit';
import { useEffect, useState } from 'react';
import * as LitJsSdk from "@lit-protocol/lit-node-client";

const accessControlConditions = [
	{
		contractAddress: "",
		standardContractType: "",
		chain: "optimism",
		method: "eth_getBalance",
		parameters: [":userAddress", "latest"],
		returnValueTest: {
			comparator: ">=",
			value: "1000000000000", // 0.000001 ETH
		},
	},
];

const chain = "optimism"

export default function Home() {

	const [client, setClient] = useState()
	const [cipher, setCipher] = useState()
	const [dataHash, setDataHash] = useState()


	const newF = async () => {
		const litNodeClient = new LitJsSdk.LitNodeClient({
			litNetwork: 'cayenne',
		});
		await litNodeClient.connect();
	
	
		// --------- NEXT STEP ---------
		const authSig = await LitJsSdk.checkAndSignAuthMessage({chain});
		console.log('AUTH RES: ', authSig)

		const encryptRes = await LitJsSdk.encryptString(
			{
			  accessControlConditions,
			  authSig,
			  chain,
			  dataToEncrypt: 'this is an awesome secret message',
			},
			litNodeClient,
		);
		console.log('ENC RES: ', encryptRes)

		setCipher(encryptRes.ciphertext)
		setDataHash(encryptRes.dataToEncryptHash)

	}

	const handleDecript = async () => {
		const litNodeClient = new LitJsSdk.LitNodeClient({
			litNetwork: 'cayenne',
		});
		await litNodeClient.connect();

		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

		const decryptRes = await LitJsSdk.decryptToString({
			accessControlConditions,
			ciphertext: cipher,
			dataToEncryptHash: dataHash,
			authSig,
			chain,
		}, litNodeClient);
		console.log('DEC RES: ', decryptRes)
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className='flex flex-col justify-between'>
				<button 
					onClick={newF}
					className='py-10'>
					Encrypt
				</button>
				<button onClick={handleDecript}>
					Decrypt 
				</button>
			</div>
		</main>
	)
}
