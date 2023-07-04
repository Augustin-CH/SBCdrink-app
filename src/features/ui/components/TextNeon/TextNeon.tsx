import React, { type CSSProperties, type FC, useEffect, useRef } from 'react'
import './style.css'

interface TextNeonProps {
  text: string
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  style?: CSSProperties
}

const TextNeon: FC<TextNeonProps> = ({
  text,
  type,
  style
}) => {
  const signs = useRef<HTMLDivElement>(null)
  const randomIn = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1) + min)
  )

  const mixupInterval = (el: any) => {
    const ms = randomIn(2000, 4000)
    el.style.setProperty('--interval', `${ms}ms`)
  }

  useEffect(() => {
    const myFunction = () => {
      mixupInterval(signs.current)
    }

    if (signs.current !== null) {
      mixupInterval(signs.current)

      signs.current.addEventListener('webkitAnimationIteration', myFunction)
    }
  })

  return (
    <div className={`x-sign x-sign-${type}`} style={style} ref={signs}>
      {text}
    </div>
  )
}

export { TextNeon }
