import React from 'react'

type PropType = {
    selected: boolean
    index: number
    onClick: () => void
    url: string
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, onClick, url, index } = props

    return (
        <div
            className={'imageGallery-thumbs__slide'.concat(
                selected ? ' imageGallery-thumbs__slide--selected' : ''
            )}
            key={index}
        >
            <div className="imageGallery-thumbs__slide__image">
                <img src={url} onClick={onClick} alt={'hello from thumb'} />
            </div>
        </div>
    )
}
