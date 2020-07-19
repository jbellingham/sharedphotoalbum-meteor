import React from 'react'
import { Card, Carousel, CarouselItem } from 'react-bootstrap'
import { MediaModel } from '/imports/api/media'
import { Image } from 'cloudinary-react'

export interface IMediaDto {
    media: MediaModel[]
}

const MediaContainer = (props: IMediaDto): JSX.Element => {
    return (
        <Carousel interval={null}>
            {props.media?.map(_ => 
                <CarouselItem key={_._id}>
                    <Image publicId={_.publicId}
                        // width="500"
                        // height="500"
                        // crop="fit"
                        quality="80"  className="d-block w-100"/>
                </CarouselItem>
            )}
        </Carousel>
    )
}

export default MediaContainer
