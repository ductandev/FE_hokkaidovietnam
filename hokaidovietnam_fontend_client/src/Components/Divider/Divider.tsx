export interface DividerProps {
    /** Color of Border */
    borderColor?: string | 'transparent';

    /** Width of Border */
    borderWidth?: number;

    /** Custom class */
    className?: string;
}

export function Divider(props: DividerProps) {
    const { borderColor = "#777171", borderWidth = 1, className = "" } = props;

    return <hr
        className={className}
        style={{
            borderBlockStart: `${borderWidth}px solid ${borderColor}`,
            border: 0,
            margin: 0,
        }}
    />
}