import React from 'react';

interface IProps {
    isTrue: boolean,
    item: any
}

function Topics(props: IProps) {
    const { isTrue, item } = props;
    console.log(item)


    return (
        <div className='flex flex-row' style={{ flexDirection: isTrue ? 'row-reverse' : 'row' }}>
            <div className='w-1/2 bg-slate-800'>
                <img src={`https://api.bachhoahanhan.com/${item.hinhAnh}`} alt="" />
            </div>
            <div className='w-1/2 bg-rose-400'>
                <h3>{item.tenSp}</h3>
                <p>{item.content}</p>
            </div>
        </div>
    );
};

export default Topics;
