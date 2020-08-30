import React from 'react'
import {  Carousel, CarouselItem } from 'react-bootstrap'
import { Image, Transformation } from 'cloudinary-react'
import { MediaModel } from '../../../api/media/media'

export interface IMediaDto {
    media: MediaModel[]
}

const MediaContainer = (props: IMediaDto): JSX.Element => {
    return (
        <Carousel interval={null}>
            {props.media?.map(_ => 
                <CarouselItem key={_._id}>
                    <div className="image-container d-flex justify-content-center" >
                        <Image publicId={_.publicId}
                            dpr="auto"
                            responsive
                            quality="25"
                            width="500"
                            height="500"
                            loading="lazy">
                            </Image>
                    </div>
                </CarouselItem>
            )}
        </Carousel>
    )
}

export default MediaContainer
