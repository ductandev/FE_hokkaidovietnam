export interface DividerProps {
    /** Color of Border */
    borderColor?: string | 'transparent';

    /** Width of Border */
    borderWidth?: number;

    /** Custom class */
    className?: string;
}

export function Divider(props: DividerProps) {
    const { borderColor = "#717171", borderWidth = 1, className = "hidden w-full mt-28 md:block" } = props;

    return <hr
        className={className}
        style={{
            borderBlockStart: `${borderWidth}px solid ${borderColor}`,
        }}
    />
}