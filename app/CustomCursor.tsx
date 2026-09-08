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

const CURSOR_STYLE_ID = "byakugan-cursor-style"
const CURSOR_STYLE = `
  html, body, a, button, [role="button"], input, textarea, select, label, summary {
    cursor: none !important;
  }
`

export function CustomCursor() {
  const eyeRef = useRef<HTMLDivElement>(null)
  const pupilRef = useRef<HTMLDivElement>(null)
  const veinsRef = useRef<SVGGElement>(null)
  const position = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const frame = useRef<number | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const updateEnabled = () => setEnabled(finePointer.matches && !reducedMotion.matches)
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

    // forcing this via injected CSS (not just document.body.style.cursor) because
    // any element with its own `cursor: pointer` rule — buttons, links, tailwind
    // utilities — overrides an inherited inline cursor on body. this is what was
    // causing the native arrow to reappear right on top of "chat with duggal".
    const style = document.createElement("style")
    style.id = CURSOR_STYLE_ID
    style.textContent = CURSOR_STYLE
    document.head.appendChild(style)

    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
      if (pupilRef.current) {
        pupilRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.2
      position.current.y += (target.current.y - position.current.y) * 0.2

      if (eyeRef.current) {
        eyeRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`
      }

      frame.current = requestAnimationFrame(animate)
    }

    const over = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null
      setActive(Boolean(element?.closest(interactiveSelector)))
    }

    const down = () => {
      if (!veinsRef.current) return
      veinsRef.current.animate(
        [
          { opacity: 0.9, transform: "scale(0.4)" },
          { opacity: 0, transform: "scale(1.8)" },
        ],
        { duration: 480, easing: "ease-out" }
      )
    }

    const leave = () => {
      if (eyeRef.current) eyeRef.current.style.opacity = "0"
      if (pupilRef.current) pupilRef.current.style.opacity = "0"
    }
    const enter = () => {
      if (eyeRef.current) eyeRef.current.style.opacity = "1"
      if (pupilRef.current) pupilRef.current.style.opacity = "1"
    }

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerover", over, { passive: true })
    window.addEventListener("pointerdown", down, { passive: true })
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("mouseenter", enter)
    frame.current = requestAnimationFrame(animate)

    return () => {
      document.getElementById(CURSOR_STYLE_ID)?.remove()
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", over)
      window.removeEventListener("pointerdown", down)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("mouseenter", enter)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }} aria-hidden="true">
      <div
        ref={eyeRef}
        style={{ position: "fixed", left: 0, top: 0, width: 32, height: 32, willChange: "transform" }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          style={{
            display: "block",
            // shrinks + fades over interactive elements instead of growing,
            // so it stops covering button/link labels like "chat with duggal"
            transform: active ? "scale(0.55)" : "scale(1)",
            opacity: active ? 0.5 : 1,
            transition: "transform 160ms ease, opacity 160ms ease",
          }}
        >
          <circle cx="16" cy="16" r="14.5" fill="#F4F3FE" stroke="#7F77DD" strokeWidth="1.4" />
          <circle cx="16" cy="16" r="10" fill="none" stroke="#AFA9EC" strokeWidth="0.9" />
          <circle cx="16" cy="16" r="5.5" fill="none" stroke="#AFA9EC" strokeWidth="0.7" />
          <g ref={veinsRef} stroke="#7F77DD" strokeWidth="1" opacity={0} style={{ transformOrigin: "16px 16px" }}>
            <line x1="16" y1="16" x2="16" y2="1" />
            <line x1="16" y1="16" x2="27" y2="5" />
            <line x1="16" y1="16" x2="31" y2="16" />
            <line x1="16" y1="16" x2="27" y2="27" />
            <line x1="16" y1="16" x2="16" y2="31" />
            <line x1="16" y1="16" x2="5" y2="27" />
            <line x1="16" y1="16" x2="1" y2="16" />
            <line x1="16" y1="16" x2="5" y2="5" />
          </g>
        </svg>
      </div>
      <div
        ref={pupilRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#26215C",
          willChange: "transform",
        }}
      />
    </div>
  )
}
