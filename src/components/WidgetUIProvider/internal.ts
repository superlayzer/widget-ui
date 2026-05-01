"use client"

import { useContext } from "react"
import { WidgetUIContext } from "./WidgetUIContext"

export function useLinkComponent() {
  const context = useContext(WidgetUIContext)
  return context?.linkComponent ?? "a"
}
