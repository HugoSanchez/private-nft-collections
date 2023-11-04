"use client"
import Image from 'next/image';
// import Lit from '../../lib/lit';
import { useEffect, useState } from 'react';
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import CryptoJS from 'crypto-js';
import { AES } from 'crypto-js';
const crypto = require('crypto') 

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


	const [image, setImage] = useState()
	const [fileName, setFileName] = useState()
	const [mimeType, setMimeType] = useState()
	const [encryptedImage, setEncryptedImage] = useState()
	const [decryptedImage, setDecryptedImage] = useState()



	const [client, setClient] = useState()
	const [cipher, setCipher] = useState()
	const [dataHash, setDataHash] = useState()
	const [bytes, setBytes] = useState()


	const newF = async () => {

		let randombytes = crypto.randomBytes(256).toString('hex')
		setBytes(randombytes)

		let cypher = AES.encrypt(image, randombytes)
		setEncryptedImage(cypher.toString())


		/**
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
		 */
	}

	const handleDecript = async () => {
		let decrypted = AES.decrypt(encryptedImage, bytes).toString(CryptoJS.enc.Utf8);
		setEncryptedImage()
		setDecryptedImage(decrypted)

		/** 
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
		*/
	}

	const handleImageUpload = (e) => {
        let file = e.target.files[0]
        e.preventDefault()

		if (!!file) {
            let reader = new FileReader()
            reader.onload = () => {
                let imageBase64 = reader.result;
                // let trimed64 = imageBase64.split(',')[1];
                setImage(imageBase64)
                setMimeType(file.type)
                setFileName(file.name)
            };
            reader.readAsDataURL(file);
        }
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className='flex flex-col justify-between'>
				<div className={`flex flex-row`}>
					<label className="h-96 w-96 border border-white ">
							<div className="h-full cursor-pointer">
								{
									!image ? 
									<div className="h-96 w-full flex flex-col items-center justify-center border border-fuchsia-300">
										<p className="font-lora text-xs text-center text-white font-semibold">Click to upload</p>
										<p className="font-lora text-xs text-center text-white">PNG, JPG or JPGE </p>
										<p className="font-lora text-xs text-center text-white font-semibold">3MB max</p>
									</div>
									:
									<img
										className='w-full h-full object-cover'
										src={image} 
										/>
								}
							</div>
							<input 
								id="dropzone-file" 
								type="file" 
								accept=".jpg, .jpge, .png"
								className="opacity-0" 
								onChange={handleImageUpload}
							/>
					</label>

					<div className='w-96 h-96 mx-10 border border-white'>
						{
							decryptedImage ?
							<img src={decryptedImage} className='w-full h-full object-contain'/>
							:
							null
						}
						{
							<div>
								{
									encryptedImage ? 
									<div className='w-full h-full bg-gray-800'/>
									:
									null
								}
							</div>
						}
					</div>
				</div>
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
