import { CSSProperties, FC } from "react";
import { Carousel, Image } from "antd";
import img1 from "../img/1.jpg"
import img2 from "../img/2.jpg"
import img3 from "../img/3.jpg"

export const ActivityCarousel: FC = () => {
    const contentStyle: CSSProperties = {
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <Carousel autoplay effect="fade">
            <div>
                <Image src={img1} style={contentStyle} preview={false} />
            </div>
            <div>
                <Image src={img2} style={contentStyle} preview={false} />
            </div>
            <div>
                <Image src={img3} style={contentStyle} preview={false} />
            </div>
        </Carousel>
    )
}