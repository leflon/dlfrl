import { Metadata } from 'next';
import '../globals.css';
import NavBar from '@/components/NavBar';
import PWAInstallPopUp from '@/components/PWAInstallPopUp';

export const metadata: Metadata = {
	title: {
		template: '%s • 일기',
		default: '일기'
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactElement;
}>) {
	return (
		<html lang='ko'>
			<body>
				<div className='relative h-[calc(100%-4rem)] overflow-auto'>
					{children}
				</div>
				<NavBar />
				<PWAInstallPopUp />
			</body>
		</html>
	);
}
