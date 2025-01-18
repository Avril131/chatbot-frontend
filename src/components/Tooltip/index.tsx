import React, {
    useState,
    useRef,
    ReactElement,
    useImperativeHandle,
    ForwardRefRenderFunction,
    useEffect,
} from 'react'
import { createPortal } from 'react-dom'
import './index.scss'

type TooltipProps = {
    content: string
    hint?: string
    direction?: 'top' | 'bottom' | 'left' | 'right'
    children: ReactElement
}

export type TooltipHandle = {
    closeTooltip: () => void
}

const Tooltip: ForwardRefRenderFunction<TooltipHandle, TooltipProps> = (
    { content, hint, direction = 'top', children },
    ref,
) => {
    const [ visible, setVisible ] = useState(false)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLElement>(null) // Ref for the child element
    const [ position, setPosition ] = useState<{
        top: number
        left: number
    } | null>(null)
    const [ arrowPosition, setArrowPosition ] = useState<{
        top?: number
        left?: number
        bottom?: number
        right?: number
    } | null>(null)

    useImperativeHandle(ref, () => ({
        closeTooltip: () => setVisible(false),
    }))

    const handleMouseEnter = () => {
        setVisible(true)
    }

    const handleMouseLeave = () => {
        setVisible(false)
    }

    useEffect(() => {
        if (visible && tooltipRef.current && targetRef.current) {
            const targetRect = targetRef.current.getBoundingClientRect()
            const tooltipRect = tooltipRef.current.getBoundingClientRect()
            const scrollY = window.scrollY
            const scrollX = window.scrollX

            let newPosition = { top: 0, left: 0 }
            let newArrowPosition = {}

            switch (direction) {
                case 'top':
                    newPosition.top =
                        targetRect.top + scrollY - tooltipRect.height - 10
                    newPosition.left =
                        targetRect.left +
                        scrollX +
                        targetRect.width / 2 -
                        tooltipRect.width / 2
                    newArrowPosition = {
                        bottom: -6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }
                    break
                case 'bottom':
                    newPosition.top = targetRect.bottom + scrollY + 10
                    newPosition.left =
                        targetRect.left +
                        scrollX +
                        targetRect.width / 2 -
                        tooltipRect.width / 2
                    newArrowPosition = {
                        top: -6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }

                    break
                case 'left':
                    newPosition.top =
                        targetRect.top +
                        scrollY +
                        targetRect.height / 2 -
                        tooltipRect.height / 2
                    newPosition.left =
                        targetRect.left + scrollX - tooltipRect.width - 10
                    newArrowPosition = {
                        right: -6,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }
                    break
                case 'right':
                    newPosition.top =
                        targetRect.top +
                        scrollY +
                        targetRect.height / 2 -
                        tooltipRect.height / 2
                    newPosition.left = targetRect.right + scrollX + 10
                    newArrowPosition = {
                        left: -6,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }
                    break
            }
            setPosition(newPosition)
            setArrowPosition(newArrowPosition)
        }
    }, [ visible, direction ])

    const clonedChild = React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: targetRef, // Assign the ref to the child
    })
    const tooltipContent = (
        <div
            ref={tooltipRef}
            className={`tooltip tooltip-${direction}`}
            style={{
                ...position,
                position: 'fixed',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                zIndex: visible ? 1000 : 1,
            }}
        >
            <p className="tooltip-font">{content}</p>
            {hint && <p className="tooltip-hint">{hint}</p>}
            <span className="tooltip-arrow" style={arrowPosition ? arrowPosition : undefined}></span>
        </div>
    )
    return (
        <div
            className="tooltip-wrapper"
            style={{ display: 'inline-block', position: 'relative' }}
        >
            {clonedChild}
            {tooltipContent && createPortal(tooltipContent, document.body)}
        </div>
    )
}

export default React.forwardRef(Tooltip)
