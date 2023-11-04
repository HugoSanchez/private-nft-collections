import './globals.css'
import ConnectButton from '../../components/ConnectButton';



export default function RootLayout({ children }) {

	return (

		<html lang="en">
			<body>
				<main>
					<div className="fixed top-0 w-screen h-20 border-b border-zinc-700">
						<div className='relative w-full h-full'>
							<div
								className='absolute right-10 top-2 w-44 h-14 bg-white flex items-center justify-center'>
								<ConnectButton />
							</div>	
						</div>
       				</div>	
					{children}
				</main>
			</body>
		</html>

	)
}
