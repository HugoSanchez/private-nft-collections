"use client"

import Link from 'next/link'
import { Drawer } from '../../../components/Drawer'
import { ethers } from 'ethers'
import { useState } from 'react'
import CryptoJS from 'crypto-js';
import { AES } from 'crypto-js';
const crypto = require('crypto')

import { encrypt } from '../../../lib/lit'

import Collection from '../../../artifacts/contracts/CollectionsRegistry.sol/CollectionRegistry.json'

const COLLECTION_ADDRESS = "0x513D41b00E4213024327D6FCcfFcaE58cF69B6Aa"
const FACTORY = "0xF288F6080cCC82eDDDd4B5AdCEB1dd262d6Ddd6a"


export default function Create({ children }) {

	const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [fileName, setFileName] = useState()
    const [image, setImage] = useState()
    const [mimetype, setMimeType] = useState()

    const createCollection = async () => {
        
        window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let account = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log(account[0])

        
        const CollectionContract = new ethers.Contract(COLLECTION_ADDRESS, Collection.abi, signer)
        await CollectionContract.connect(signer)
        let tx = await CollectionContract.create("0x", "000000005000000000", account[0])
        await tx.wait()
        let bigInt = await CollectionContract.getTokenId()
        let tokenId = parseInt(bigInt._hex).toString()
        
        let randombytes = crypto.randomBytes(256).toString('hex')
        let encryptedImage = AES.encrypt(image, randombytes)
        let {cif, hash} = await encrypt(randombytes, tokenId)
        
        let data = await uploadMetadataToAreweave(cif, hash, encryptedImage.toString())
        console.log('URL: ', data.url)
        await CollectionContract._setTokenMetadata(tokenId, data.url)
    
    }


    const uploadMetadataToAreweave = async (cif, hash, encImage) => {
        let base = process.env.NEXT_PUBLIC_BASE_URL + '/arweave'
        let response = await fetch(base, {
            method: 'POST',
            body: JSON.stringify({title, description, encImage, mimetype, cif, hash})
        })
        return await response.json()
    }

    const createCiphers = async (tokenId) => {
        let randombytes = crypto.randomBytes(256).toString('hex')
        let encryptedImage = AES.encrypt(image, randombytes)
		setImage(encryptedImage.toString())
        return await encrypt(randombytes, tokenId)
    }


    const handleImageUpload = (e) => {
        let file = e.target.files[0]
        e.preventDefault()

		if (!!file) {
            let reader = new FileReader()
            reader.onload = () => {
                let imageBase64 = reader.result;
                let trimed64 = imageBase64.split(',')[1];
                setImage(trimed64)
                setMimeType(file.type)
                setFileName(file.name)
            };
            reader.readAsDataURL(file);
        }
	}

	return (
		<main>
            <div className='w-full h-screen flex flex-col items-center pt-32 px-5 md:px-96'>
                <div className='w-full'>
                    <p className='text-5xl font-semibold text-gray-100 mb-10'>Create Collection</p>
                    <label className="w-full flex flex-col">
                        <p className="text-lg font-bold text-gray-200 py-2">Title</p>
                        <input 
                            type="text" 
                            name="title"
                            value={title || ''}
                            placeholder=''
                            className="h-14 px-4 font-light font-lora text-zinc600 bg-zinc-800 text-sm focus:outline-none" 
                            onChange={(e) => setTitle(e.target.value)}>
                        </input>
                    </label>
                </div>
                
                <div className='w-full'>
                    <label className="w-full flex flex-col">
                        <p className="text-lg font-bold text-gray-200 py-2">Description</p>
                        <textarea 
                            type="text" 
                            name="title"
                            value={description || ''}
                            placeholder=''
                            className="h-32 px-4 font-light font-lora bg-zinc-800 text-sm focus:outline-none" 
                            onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </label>
                </div>
                
                
                <div className={` w-full `}>
                    <label className="h-full w-full flex flex-col">
                        <p className="text-lg font-bold text-gray-200 py-2">Cover Picture</p>
                            <div className="flex flex-col items-center justify-center h-20 cursor-pointer bg-zinc-800 overflow-hidden pt-8 pb-8">
                                {
                                    !fileName ? 
                                    <div>
                                        <p className="text-xs text-zinc800"><span className="font-semibold">Click to upload</span></p>
                                        <p className="text-xs text-zinc600">PNG, JPG or JPGE</p>
                                    </div>
                                    :
                                    <p className="text-zinc800 text-xs font-semibold">{fileName}</p>
                                }
                            </div>
                            <input 
                                id="dropzone-file" 
                                type="file" 
                                accept=".jpg, .jpge, .png"
                                className="opacity-0 z-40" 
                                onChange={handleImageUpload}
                                />
                    </label>
                </div>


                <div className='w-full h-16 bg-white flex flex-col items-center justify-center'>
                    <button
                        onClick={() => createCollection()} 
                        className='flex flex-col items-center justify-center'>
                        <p className='text-black text-xl font-semibold'>Mint Collection</p>
                    </button>
                </div>
                
            </div>
		</main>
	)
}
