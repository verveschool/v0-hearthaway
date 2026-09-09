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
      const desired = activeRef.current ? { x: 9, y: -11 } : { x: 0, y: 0 }
      offset.current.x += (desired.x - offset.current.x) * 0.35
      offset.current.y += (desired.y - offset.current.y) * 0.35

      if (eyeRef.current) {
        eyeRef.current.style.transform = `translate3d(${target.current.x + offset.current.x - 15}px, ${target.current.y + offset.current.y - 15}px, 0)`
      }

      frame.current = requestAnimationFrame(animate)
    }

    const over = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null
      const isActive = Boolean(element?.closest(interactiveSelector))
      activeRef.current = isActive
      if (isActive !== wasActiveRef.current && veinsRef.current) {
        veinsRef.current.style.opacity = isActive ? "0.9" : "0.35"
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
        veinsRef.current.style.opacity = activeRef.current ? "0.9" : "0.35"
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
        style={{ position: "fixed", left: 0, top: 0, width: 30, height: 30, willChange: "transform" }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" style={{ display: "block" }}>
          <circle cx="15" cy="15" r="12.5" fill="#E3DFFF" stroke="#4C43C4" strokeWidth="2" />
          <circle cx="15" cy="15" r="5" fill="none" stroke="#4C43C4" strokeWidth="1" opacity="0.5" />
          <g ref={veinsRef} stroke="#4C43C4" strokeWidth="0.6" opacity={0.35}>
            <line x1="22.00" y1="15.00" x2="26.50" y2="15.00" />
            <line x1="21.66" y1="17.16" x2="25.94" y2="18.55" />
            <line x1="20.66" y1="19.11" x2="24.30" y2="21.76" />
            <line x1="19.11" y1="20.66" x2="21.76" y2="24.30" />
            <line x1="17.16" y1="21.66" x2="18.55" y2="25.94" />
            <line x1="15.00" y1="22.00" x2="15.00" y2="26.50" />
            <line x1="12.84" y1="21.66" x2="11.45" y2="25.94" />
            <line x1="10.89" y1="20.66" x2="8.24" y2="24.30" />
            <line x1="9.34" y1="19.11" x2="5.70" y2="21.76" />
            <line x1="8.34" y1="17.16" x2="4.06" y2="18.55" />
            <line x1="8.00" y1="15.00" x2="3.50" y2="15.00" />
            <line x1="8.34" y1="12.84" x2="4.06" y2="11.45" />
            <line x1="9.34" y1="10.89" x2="5.70" y2="8.24" />
            <line x1="10.89" y1="9.34" x2="8.24" y2="5.70" />
            <line x1="12.84" y1="8.34" x2="11.45" y2="4.06" />
            <line x1="15.00" y1="8.00" x2="15.00" y2="3.50" />
            <line x1="17.16" y1="8.34" x2="18.55" y2="4.06" />
            <line x1="19.11" y1="9.34" x2="21.76" y2="5.70" />
            <line x1="20.66" y1="10.89" x2="24.30" y2="8.24" />
            <line x1="21.66" y1="12.84" x2="25.94" y2="11.45" />
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
          background: "#4C43C4",
          willChange: "transform",
        }}
      />
    </div>
  )
}
