'use client'

import { useEffect, useRef, useState } from 'react'

export function HomeMotion() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-home-reveal]')

    if (elements.length === 0) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('home-revealed'))
      return
    }

    document.documentElement.classList.add('home-motion-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('home-revealed')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('home-motion-ready')
    }
  }, [])

  return null
}

type AnimatedMetricProps = {
  value: number
  suffix?: string
}

export function AnimatedMetric({ value, suffix = '' }: AnimatedMetricProps) {
  const [count, setCount] = useState(value)
  const metricRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const metric = metricRef.current

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!metric || motionPreference.matches || !('IntersectionObserver' in window)) {
      return
    }

    let animationFrame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (!entry?.isIntersecting) {
          return
        }

        observer.disconnect()
        const startedAt = performance.now()
        const duration = 900

        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(value * easedProgress))

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(animate)
          }
        }

        setCount(0)
        animationFrame = window.requestAnimationFrame(animate)
      },
      { threshold: 0.55 },
    )

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return
      }

      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
      setCount(value)
    }

    motionPreference.addEventListener('change', handleMotionPreferenceChange)
    observer.observe(metric)

    return () => {
      observer.disconnect()
      motionPreference.removeEventListener('change', handleMotionPreferenceChange)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [value])

  const finalValue = `${value.toLocaleString('en-GB')}${suffix}`
  const visibleValue = `${count.toLocaleString('en-GB')}${suffix}`

  return (
    <span ref={metricRef} className="tabular-nums">
      <span aria-hidden="true">{visibleValue}</span>
      <span className="sr-only">{finalValue}</span>
    </span>
  )
}
