'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
  className?: string
}

export function TypewriterText({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  delaySpeed = 2000,
  className,
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullWord = words[currentWordIndex % words.length]

    let timer: NodeJS.Timeout

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.substring(0, prev.length - 1))
        if (currentText.length <= 1) {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }, deleteSpeed)
    } else {
      if (currentText.length < currentFullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentFullWord.substring(0, currentText.length + 1))
        }, typeSpeed)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, delaySpeed)
      }
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delaySpeed])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-comet font-mono ml-0.5">|</span>
    </span>
  )
}
