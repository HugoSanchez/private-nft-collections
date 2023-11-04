"use client"

import Link from 'next/link'
import { Drawer } from '../../../components/Drawer'
import { useState } from 'react'


export default function Feed({ children }) {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<main>

			<Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
				<p>Hello</p>
			</Drawer>

			<div className="px-5 md:px-16 mt-32">
				<div className="grid grid-cols-4 gap-8">
					{
						[1,1,1,1,1,1,1,1,1,1].map((item, index) => {
							return (
								<div>
									<Link href={'/feed/collection'}>
										<div className="w-full h-72 border border-white">
										</div>
										<div className="w-full h-14 py-2 flex flex-col">
											<p className="font-bold text-lg">Collection Title</p>
											<p className="text-gray-400 font-light">9 elements</p>
										</div>
									</Link>
									
								</div>
							)
						})
					}
				</div>
				<div className='fixed bottom-10 right-10'>
					<div className='h-14 w-14 rounded-full flex items-center justify-center pb-1 bg-green-100'>
						<p className='text-black text-4xl font-light'>+</p>
					</div>
				</div>
			</div>
		</main>
	)
}
