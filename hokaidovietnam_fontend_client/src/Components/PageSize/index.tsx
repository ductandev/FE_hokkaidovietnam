import Selection from "@/Components/Selection";

function PageSize(props: any) {
    const { defaultValue, options,
        // onChange,
        className } = props;

    const reOptions = options.map((option: any) => {
        return {
            label: option,
            value: option
        }
    })
    return (
        <div className={`flex items-center ${className}`} style={{
            minWidth: 130
        }}>
            <span className="mr-4 flex inline-block">Hiển thị</span>

            <div>
                <Selection
                    options={reOptions}
                    value="value"
                    name="Hiển thị"
                    displayKey="label"
                    title="Hiển thị"
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    )
}

export default PageSize