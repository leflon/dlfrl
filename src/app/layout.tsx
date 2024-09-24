import './globals.css';

export const metadata = {
	title: '일기',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				<meta name='description' content='일기를 쉽게 쓰려고'/>

				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#ffe37c' />
				<meta name='msapplication-TileColor' content='#ffe37c' />
				<meta name='theme-color' content='#ffe37c' />

				<meta property='og:type' content='website'/>
				<meta property='og:url' content='https://dlfrl.paulleflon.fr'/>
				<meta property='og:title' content='일기'/>
				<meta property='og:description' content='일기를 쉽게 쓰려고'/>
				<meta property='og:image' content='https://dlfrl.paulleflon.fr/og-image.png'/>

				<meta property='twitter:card' content='summary_large_image'/>
				<meta property='twitter:url' content='https://dlfrl.twitter.paulleflon.fr'/>
				<meta property='twitter:title' content='일기'/>
				<meta property='twitter:description' content='일기를 쉽게 쓰려고'/>
				<meta property='twitter:image' content='https://dlfrl.paulleflon.fr/og-image.png'/>
			</head>
			<body>{children}</body>
		</html>
	);
}