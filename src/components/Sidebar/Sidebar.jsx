import React from "react";

const Sidebar = React.forwardRef((props, ref) => {
    const {handleAxis, ...restProps} = props;
    return <div ref={ref} className={`foo handle-${handleAxis}`} {...restProps} />;
});

export default Sidebar;