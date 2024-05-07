import { formatCurrency } from "@/Helper/helper";

import "./styles.scss";

function MetricCard(props: any) {
    const { icon, label, index, format } = props;

    return (
        <div className='metric-wrapper'>
            <div className="metric-wrapper-icon">
                {icon}
            </div>

            <div>
                <p className="metric-wrapper-label">{label}</p>

                <p className="metric-wrapper-index">
                    {format !== "currency" ? `${index} ${format}` : formatCurrency(index)}
                </p>
            </div>
        </div>
    )
}

export default MetricCard