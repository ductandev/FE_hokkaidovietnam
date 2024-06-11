import { ReactComponent as EmptySVG } from "assets/image/empty/empty-svg.svg";
import { ReactComponent as EmptyColorSVG } from "assets/image/empty/empty-color.svg";
import { memo } from "react";

interface IProps {
    text: string;
    subText?: string;
    isHaveColor?: boolean;
    isUnsetMinHeight?: boolean;
    isShowIcon?: boolean;
}

function BlankPage(props: IProps) {
    const {
        text,
        subText,
        isHaveColor = false,
        isUnsetMinHeight = false,
        isShowIcon = true,
    } = props;

    return (
        <>
            {isShowIcon ? (
                <div
                    className="flex flex-col justify-center items-center"
                    style={{
                        minHeight: isUnsetMinHeight ? "unset" : "240px",
                    }}
                >
                    {isShowIcon && (
                        <div>{isHaveColor ? <EmptyColorSVG /> : <EmptySVG />}</div>
                    )}

                    {subText !== undefined ? (
                        <div className="text-center">
                            <p className="text-center mb-0 mt-16 fs-16 fw-600 text-color-black-6">
                                {text}
                            </p>
                            <p className="text-center mb-0 mt-4 fs-14 text-color-black-5">
                                {subText}
                            </p>
                        </div>
                    ) : (
                        <p className="text-center mb-0 mt-16 fs-14 text-color-black-5">
                            {text}
                        </p>
                    )}
                </div>
            ) : (
                <p className="text-center mb-0 fs-14 text-color-black-5">
                    {text}
                </p>
            )}
        </>
    );
}

export default memo(BlankPage)