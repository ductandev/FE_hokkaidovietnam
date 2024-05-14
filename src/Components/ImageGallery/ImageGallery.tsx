import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'

import { Thumb } from './Thumb';
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './Arrow';

import "./styles.scss";

type PropType = {
    slides: Array<any>
    options?: EmblaOptionsType
    customClass?: string
    showArrow?: boolean
};

export const ImageGallery: React.FC<PropType> = (props) => {
    const { slides, options, customClass, showArrow } = props;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaMainApi);

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap());

        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return

        onSelect();

        emblaMainApi.on('select', onSelect);
        emblaMainApi.on('reInit', onSelect);
    }, [emblaMainApi, onSelect]);

    return (
        <div className={`imageGallery ${customClass}`}>
            <div className="imageGallery__viewport" ref={emblaMainRef}>
                <div className="imageGallery__container">
                    {slides.map((url: any, index) => (
                        <div className="imageGallery__slide" key={index}>
                            <img src={url} alt={"hello from slider"} />
                        </div>
                    ))}
                </div>
            </div>

            {!showArrow && <div className="imageGallery-thumbs">
                <div className="imageGallery-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="imageGallery-thumbs__container">
                        {slides.map((url, index) => (
                            <Thumb
                                url={url}
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>}

            {showArrow && <div className="imageGallery__buttons">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>}
        </div>
    )
}

