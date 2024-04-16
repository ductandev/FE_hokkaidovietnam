import { ReactNode } from 'react'
import Background from 'assets/image/banner.png';

interface IProps {
    title: string | ReactNode;
    background?: string
}
function Banner(props: IProps) {
    const { title, background = Background } = props;

    return (
        <div style={{
            height: "208px",
            width: "100vw",
            backgroundImage: `url(${background})`,
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            backgroundSize: 'cover'
        }}>
            <h1 style={{
                fontSize: 36
            }}>{title}</h1>
        </div>
    )
}

export default Banner