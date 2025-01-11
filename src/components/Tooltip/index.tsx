import React, { useState, useRef, ReactElement, useImperativeHandle, ForwardRefRenderFunction, useEffect } from 'react';
import "./index.scss"

type TooltipProps = {
    content: string;
    hint?: string;
    direction?: 'top' | 'bottom' | 'left' | 'right';
    children: ReactElement;
}

export type TooltipHandle = {
    closeTooltip: () => void;
}

const Tooltip: ForwardRefRenderFunction<TooltipHandle, TooltipProps> = (
    { content, hint, direction = 'top', children }, ref
) => {
    const [ visible, setVisible ] = useState<boolean>(false)
    const tooltipRef = useRef<HTMLDivElement | null>(null)
    const [ timer, setTimer ] = useState<NodeJS.Timeout | null>(null);

    useImperativeHandle(ref, () => ({
        closeTooltip: () => setVisible(false),
    }))

    const handleMouseEnter = () => {
        if (timer) clearTimeout(timer);
        setVisible(true);
    };
    const handleMouseLeave = () => {
        if (timer) clearTimeout(timer);

        // 设置新的定时器延迟关闭 Tooltip
        const newTimer = setTimeout(() => {
            setVisible(false); // 延迟隐藏 Tooltip
        }, 300); // 300ms 延迟
        setTimer(newTimer);
    };

    const clonedChild = React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    });

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [ timer ]);

    return (
        <div className='tooltip-wrapper'>
            {clonedChild}
            {
                visible && (
                    <div
                        ref={tooltipRef}
                        className={`tooltip tooltip-${direction} visible`}
                    >
                        <p className='tooltip-font'>{content}</p>
                        {hint && <p className='tooltip-hint'>{hint}</p>}
                    </div>
                )
            }
        </div>
    )
}

export default React.forwardRef(Tooltip);