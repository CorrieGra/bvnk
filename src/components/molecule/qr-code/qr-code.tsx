import { Typography } from 'components/atoms';
import { QRCodeContainer, QRCodeImage } from './qr-code.styles';

type QRCodeProps = {
	src: string;
	caption: string;
};

export const QRCode = (props: QRCodeProps) => {
	const { src, caption } = props;

	return (
		<QRCodeContainer
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<QRCodeImage
				src={src}
				width={140}
				height={140}
			/>
			<Typography
				value={caption}
				$variant='body'
				$colour='lightgray'
			/>
		</QRCodeContainer>
	);
};
