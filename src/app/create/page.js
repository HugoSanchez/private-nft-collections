"use client"

import Link from 'next/link'
import { Drawer } from '../../../components/Drawer'
import { useState } from 'react'


export default function Create({ children }) {

	const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [fileName, setFileName] = useState()


    const handleImageUpload = () => {

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
                    <button className='flex flex-col items-center justify-center'>
                        <p className='text-black text-xl font-semibold'>Mint Collection</p>
                    </button>
                </div>
                
            </div>
		</main>
	)
}
