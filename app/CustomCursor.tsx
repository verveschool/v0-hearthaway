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
  const dotRef = useRef<HTMLDivElement>(null)
  const veinsRef = useRef<SVGGElement>(null)
  const position = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const offset = useRef({ x: 0, y: 0 })
  const activeRef = useRef(false)
  const wasActiveRef = useRef(false)
  const frame = useRef<number | null>(null)
  const [enabled, setEnabled] = useState(false)

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

    const style = document.createElement("style")
    style.id = CURSOR_STYLE_ID
    style.textContent = CURSOR_STYLE
    document.head.appendChild(style)

    if (veinsRef.current) {
      veinsRef.current.style.transition = "opacity 160ms ease"
    }

    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX - 1.5}px, ${event.clientY - 1.5}px, 0)`
      }
    }

    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.25
      position.current.y += (target.current.y - position.current.y) * 0.25

      const desired = activeRef.current ? { x: 20, y: -24 } : { x: 0, y: 0 }
      offset.current.x += (desired.x - offset.current.x) * 0.2
      offset.current.y += (desired.y - offset.current.y) * 0.2

      if (eyeRef.current) {
        eyeRef.current.style.transform = `translate3d(${position.current.x + offset.current.x - 13}px, ${position.current.y + offset.current.y - 13}px, 0)`
      }

      frame.current = requestAnimationFrame(animate)
    }

    const over = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null
      const isActive = Boolean(element?.closest(interactiveSelector))
      activeRef.current = isActive
      if (isActive !== wasActiveRef.current && veinsRef.current) {
        veinsRef.current.style.opacity = isActive ? "0.45" : "0"
      }
      wasActiveRef.current = isActive
    }

    const down = () => {
      if (!veinsRef.current) return
      veinsRef.current.style.transition = "none"
      veinsRef.current.style.opacity = "1"
      requestAnimationFrame(() => {
        if (!veinsRef.current) return
        veinsRef.current.style.transition = "opacity 420ms ease-out"
        veinsRef.current.style.opacity = activeRef.current ? "0.45" : "0"
      })
    }

    const leave = () => {
      if (eyeRef.current) eyeRef.current.style.opacity = "0"
      if (dotRef.current) dotRef.current.style.opacity = "0"
    }
    const enter = () => {
      if (eyeRef.current) eyeRef.current.style.opacity = "1"
      if (dotRef.current) dotRef.current.style.opacity = "1"
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
        style={{ position: "fixed", left: 0, top: 0, width: 26, height: 26, willChange: "transform" }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" style={{ display: "block" }}>
          <circle cx="13" cy="13" r="11.5" fill="#F8F7FF" stroke="#8F87E0" strokeWidth="1.3" />
          <g ref={veinsRef} stroke="#8F87E0" strokeWidth="0.8" opacity={0}>
            <line x1="13" y1="13" x2="13" y2="0" />
            <line x1="13" y1="13" x2="24" y2="4" />
            <line x1="13" y1="13" x2="26" y2="13" />
            <line x1="13" y1="13" x2="24" y2="22" />
            <line x1="13" y1="13" x2="13" y2="26" />
            <line x1="13" y1="13" x2="2" y2="22" />
            <line x1="13" y1="13" x2="0" y2="13" />
            <line x1="13" y1="13" x2="2" y2="4" />
          </g>
        </svg>
      </div>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 3,
          height: 3,
          borderRadius: "50%",
          background: "#8F87E0",
          willChange: "transform",
        }}
      />
    </div>
  )
}
