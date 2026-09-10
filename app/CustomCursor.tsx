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
  const veinsRef = useRef<SVGGElement>(null)
  const activeRef = useRef(false)
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

    // no lag, no offset — the eye sits exactly on the real pointer position,
    // always. removes the whole class of "displaced dot" bugs from before.
    const move = (event: PointerEvent) => {
      if (eyeRef.current) {
        eyeRef.current.style.transform = `translate3d(${event.clientX - 15}px, ${event.clientY - 15}px, 0)`
      }
    }

    const over = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null
      const isActive = Boolean(element?.closest(interactiveSelector))
      if (isActive !== activeRef.current && veinsRef.current) {
        veinsRef.current.style.opacity = isActive ? "0.9" : "0"
      }
      activeRef.current = isActive
    }

    const down = () => {
      if (!veinsRef.current) return
      veinsRef.current.style.transition = "none"
      veinsRef.current.style.opacity = "1"
      requestAnimationFrame(() => {
        if (!veinsRef.current) return
        veinsRef.current.style.transition = "opacity 420ms ease-out"
        veinsRef.current.style.opacity = activeRef.current ? "0.9" : "0"
      })
    }

    const leave = () => {
      if (eyeRef.current) eyeRef.current.style.opacity = "0"
    }
    const enter = () => {
      if (eyeRef.current) eyeRef.current.style.opacity = "1"
    }

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerover", over, { passive: true })
    window.addEventListener("pointerdown", down, { passive: true })
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("mouseenter", enter)

    return () => {
      document.getElementById(CURSOR_STYLE_ID)?.remove()
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", over)
      window.removeEventListener("pointerdown", down)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("mouseenter", enter)
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
          {/* plain hyuga eye — default, always visible */}
          <circle cx="15" cy="15" r="12.5" fill="#E3DFFF" stroke="#4C43C4" strokeWidth="2" />

          {/* byakugan activation — hidden until hovering something interactive */}
          <g ref={veinsRef} stroke="#4C43C4" strokeWidth="0.6" opacity={0}>
            <circle cx="15" cy="15" r="5" fill="none" strokeWidth="1" />
            <line x1="20.92" y1="14.87" x2="24.36" y2="14.80" strokeWidth="0.48" />
            <line x1="21.06" y1="16.52" x2="23.12" y2="17.04" strokeWidth="0.65" />
            <line x1="20.78" y1="17.63" x2="22.74" y2="18.53" strokeWidth="0.49" />
            <line x1="20.24" y1="19.56" x2="21.95" y2="21.05" strokeWidth="0.54" />
            <line x1="18.96" y1="20.92" x2="20.77" y2="23.64" strokeWidth="0.61" />
            <line x1="16.73" y1="20.50" x2="17.90" y2="24.21" strokeWidth="0.57" />
            <line x1="15.96" y1="20.80" x2="16.39" y2="23.44" strokeWidth="0.78" />
            <line x1="14.46" y1="21.55" x2="14.18" y2="24.94" strokeWidth="0.6" />
            <line x1="12.91" y1="20.41" x2="12.15" y2="22.39" strokeWidth="0.53" />
            <line x1="11.29" y1="20.14" x2="9.71" y2="22.32" strokeWidth="0.68" />
            <line x1="10.42" y1="19.10" x2="7.63" y2="21.60" strokeWidth="0.73" />
            <line x1="9.29" y1="18.23" x2="6.54" y2="19.78" strokeWidth="0.8" />
            <line x1="9.01" y1="16.30" x2="4.95" y2="17.19" strokeWidth="0.5" />
            <line x1="8.16" y1="15.07" x2="5.83" y2="15.09" strokeWidth="0.65" />
            <line x1="8.41" y1="13.76" x2="4.80" y2="13.08" strokeWidth="0.68" />
            <line x1="9.67" y1="11.89" x2="6.62" y2="10.11" strokeWidth="0.69" />
            <line x1="10.26" y1="10.72" x2="7.41" y2="8.14" strokeWidth="0.83" />
            <line x1="11.18" y1="9.50" x2="9.96" y2="7.75" strokeWidth="0.73" />
            <line x1="12.57" y1="8.23" x2="11.28" y2="4.65" strokeWidth="0.56" />
            <line x1="14.10" y1="8.36" x2="13.83" y2="6.33" strokeWidth="0.63" />
            <line x1="15.48" y1="9.14" x2="15.65" y2="7.02" strokeWidth="0.76" />
            <line x1="16.90" y1="9.23" x2="17.79" y2="6.52" strokeWidth="0.8" />
            <line x1="18.35" y1="9.58" x2="20.04" y2="6.85" strokeWidth="0.8" />
            <line x1="20.41" y1="10.56" x2="22.43" y2="8.91" strokeWidth="0.62" />
            <line x1="21.17" y1="11.63" x2="24.77" y2="9.66" strokeWidth="0.51" />
            <line x1="20.81" y1="13.33" x2="23.23" y2="12.63" strokeWidth="0.64" />
          </g>
        </svg>
      </div>
    </div>
  )
}
