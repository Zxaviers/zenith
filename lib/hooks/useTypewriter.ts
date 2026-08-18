'use client'

import { useEffect, useState, useRef } from 'react'

export interface TypewriterOptions {
  /** Typing speed per character in ms (default: 40ms) */
  typeSpeed?: number
  /** Deletion speed per character in ms (default: 25ms) */
  deleteSpeed?: number
  /** Pause duration before deleting in ms (default: 1600ms) */
  pauseDuration?: number
  /** Pause before typing next in ms (default: 400ms) */
  initialDelay?: number
  /** Whether to loop through phrases */
  loop?: boolean
  /** Skip animation completely (e.g. for reduced motion) */
  reducedMotion?: boolean
}

/**
 * Reusable Typewriter hook supporting single phrase or rotating phrase list with smooth deletion.
 */
export function useTypewriter(
  input: string | string[],
  options: TypewriterOptions = {}
): {
  displayed: string
  isTyping: boolean
  isWaiting: boolean
} {
  const {
    typeSpeed = 40,
    deleteSpeed = 25,
    pauseDuration = 1600,
    initialDelay = 350,
    loop = true,
    reducedMotion = false,
  } = options

  const phrases = Array.isArray(input) ? input : [input]
  const isMultiple = Array.isArray(input) && input.length > 1

  const [displayed, setDisplayed] = useState(reducedMotion ? phrases[0] : '')
  const [index, setIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isWaiting, setIsWaiting] = useState(!reducedMotion)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (reducedMotion) {
      setDisplayed(phrases[index % phrases.length])
      setIsTyping(false)
      setIsWaiting(false)
      return
    }

    const currentPhrase = phrases[index % phrases.length]
    let charPos = 0
    let isDeleting = false

    setDisplayed('')
    setIsWaiting(true)
    setIsTyping(false)

    const tick = () => {
      if (!isDeleting) {
        charPos++
        setDisplayed(currentPhrase.slice(0, charPos))
        setIsTyping(true)
        setIsWaiting(false)

        if (charPos >= currentPhrase.length) {
          setIsTyping(false)
          if (isMultiple && loop) {
            isDeleting = true
            timerRef.current = setTimeout(tick, pauseDuration)
            return
          }
          return
        }
        timerRef.current = setTimeout(tick, typeSpeed)
      } else {
        charPos--
        setDisplayed(currentPhrase.slice(0, Math.max(0, charPos)))
        setIsTyping(true)

        if (charPos <= 0) {
          setIsTyping(false)
          setIsWaiting(true)
          setIndex((prev) => (prev + 1) % phrases.length)
          return
        }
        timerRef.current = setTimeout(tick, deleteSpeed)
      }
    }

    timerRef.current = setTimeout(tick, initialDelay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [
    input,
    index,
    reducedMotion,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    initialDelay,
    loop,
    isMultiple,
  ])

  return { displayed, isTyping, isWaiting }
}
