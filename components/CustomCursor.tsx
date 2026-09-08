"use client"

import { useEffect, useRef, useState } from "react"

const interactiveSelector = [
  "a",
  "button",
  "summary",
  "label",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
  "input[type='button']",
  "input[type='submit']",
  "input[type='file']",
].join(",")

function ByakuganEye({
  active = false,
  pressed = false,
  size = 34,
}: {
  active?: boolean
  pressed?: boolean
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`hearthaway-byakugan ${active ? "is-active" : ""} ${
        pressed ? "is-pressed" : ""
      }`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hearthawayByakuganCore" cx="50%" cy="45%" r="58%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="76%" stopColor="#f7fbff" />
          <stop offset="100%" stopColor="#eaf2f8" />
        </radialGradient>

        <filter
          id="hearthawayByakuganGlow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="1.65" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hearthaway-byakugan-rings">
        <circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          stroke="rgba(96, 132, 163, 0.22)"
          strokeWidth="0.8"
        />
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="rgba(96, 132, 163, 0.34)"
          strokeWidth="0.9"
        />
        <circle
          cx="32"
          cy="32"
          r="17"
          fill="none"
          stroke="rgba(87, 127, 161, 0.48)"
          strokeWidth="1"
        />
        <circle
          cx="32"
          cy="32"
          r="11.8"
          fill="url(#hearthawayByakuganCore)"
          stroke="rgba(99, 139, 173, 0.42)"
          strokeWidth="0.9"
        />
        <circle
          cx="32"
          cy="32"
          r="3"
          className="hearthaway-byakugan-pupil"
          fill="rgba(52, 89, 120, 0.68)"
        />
        <circle cx="25.5" cy="23.5" r="1.9" fill="rgba(255, 255, 255, 0.94)" />
      </g>
    </svg>
  )
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const position = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const frame = useRef<number | null>(null)

  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const updateEnabled = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches)
    }

    updateEnabled()
    finePointer.addEventListener("change", updateEnabled)
    reducedMotion.addEventListener("change", updateEnabled)

    return () => {
      finePointer.removeEventListener("change", updateEnabled)
      reducedMotion.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }

      if (!cursorRef.current?.dataset.visible) {
        position.current = target.current
      }
    }

    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.22
      position.current.y += (target.current.y - position.current.y) * 0.22

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`
      }

      frame.current = requestAnimationFrame(animate)
    }

    const over = (event: PointerEvent) => {
      const element =
        event.target instanceof Element ? event.target : null

      const isInteractive = Boolean(
        element?.closest(interactiveSelector),
      )

      setActive(isInteractive)

      if (isInteractive) {
        cursorRef.current?.setAttribute("data-visible", "true")
      } else {
        cursorRef.current?.removeAttribute("data-visible")
      }
    }

    const down = (event: PointerEvent) => {
      setPressed(true)

      if (rippleRef.current) {
        rippleRef.current.style.left = `${event.clientX}px`
        rippleRef.current.style.top = `${event.clientY}px`

        rippleRef.current.animate(
          [
            {
              opacity: 0.20,
              transform: "translate(-50%, -50%) scale(0.32)",
            },
            {
              opacity: 0,
              transform: "translate(-50%, -50%) scale(1.4)",
            },
          ],
          {
            duration: 420,
            easing: "ease-out",
          },
        )
      }
    }

    const up = () => setPressed(false)

    const leave = () => {
      cursorRef.current?.removeAttribute("data-visible")
      setActive(false)
    }

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerover", over, { passive: true })
    window.addEventListener("pointerdown", down, { passive: true })
    window.addEventListener("pointerup", up, { passive: true })
    document.documentElement.addEventListener("mouseleave", leave)

    frame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", over)
      window.removeEventListener("pointerdown", down)
      window.removeEventListener("pointerup", up)
      document.documentElement.removeEventListener("mouseleave", leave)

      if (frame.current) {
        cancelAnimationFrame(frame.current)
      }
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="hearthaway-cursor"
        data-active={active}
        data-pressed={pressed}
        aria-hidden="true"
      >
        <ByakuganEye active={active} pressed={pressed} />
      </div>

      <div
        ref={rippleRef}
        className="hearthaway-cursor-ripple"
        aria-hidden="true"
      />

      <style jsx>{`
        .hearthaway-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 34px;
          height: 34px;
          z-index: 99999;
          pointer-events: none;
          opacity: 0;
          transform-origin: center;
          will-change: transform, opacity;
          transition: opacity 180ms ease;
        }

        .hearthaway-cursor[data-visible="true"] {
          opacity: 1;
        }

        .hearthaway-byakugan {
          width: 100%;
          height: 100%;
          overflow: visible;
          transform-origin: center;
          animation: hearthawayByakuganBreathe 5.8s ease-in-out infinite;
          filter: drop-shadow(
            0 3px 8px rgba(74, 109, 137, 0.09)
          );
        }

        .hearthaway-byakugan-rings {
          transform-origin: 32px 32px;
          animation: hearthawayByakuganRotate 13s linear infinite;
        }

        .hearthaway-byakugan.is-active {
          filter: url(#hearthawayByakuganGlow)
            drop-shadow(
              0 4px 13px rgba(89, 139, 180, 0.18)
            );
        }

        .hearthaway-byakugan.is-active .hearthaway-byakugan-pupil {
          fill: rgba(38, 78, 111, 0.88);
        }

        .hearthaway-byakugan.is-pressed {
          transform: scale(0.86);
        }

        .hearthaway-cursor-ripple {
          position: fixed;
          top: 0;
          left: 0;
          width: 34px;
          height: 34px;
          z-index: 99998;
          pointer-events: none;
          border: 1px solid rgba(103, 143, 176, 0.28);
          border-radius: 999px;
          opacity: 0;
        }

        @keyframes hearthawayByakuganRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes hearthawayByakuganBreathe {
          0%,
          100% {
            transform: scale(0.985);
          }

          50% {
            transform: scale(1.015);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hearthaway-byakugan,
          .hearthaway-byakugan-rings {
            animation: none;
          }

          .hearthaway-cursor {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
