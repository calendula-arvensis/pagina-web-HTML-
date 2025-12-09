import { useEffect, useState } from "react"
import type { Color } from "@/types/color"
import { API_BASE_URL, isApiConfigured } from "@/config/api"

type ColorsResponse = {
  colores: Color[]
}

type UseColorsResult = {
  colors: Color[]
  selectedColorId: string | null
  selectedColorUri: string | null
  loading: boolean
  errorMsg: string | null
  selectColor: (color: Color) => void
  updateColors: (newColors: Color[]) => void
}

/**
 * Maneja:
 * - carga inicial de colores desde /colores.json
 * - estado loading / error
 * - color seleccionado y su URI
 * - actualización de la lista de colores
 */
export const useColors = (): UseColorsResult => {
  const [colors, setColors] = useState<Color[]>([])
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null)
  const [selectedColorUri, setSelectedColorUri] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const loadColors = async () => {
      // Caso 1: la API no está configurada
      if (!isApiConfigured()) {
        setErrorMsg(
          "No se pudo configurar la conexión con la API. Verificá la URL.",
        )
        setColors([])
        setSelectedColorId(null)
        setSelectedColorUri(null)
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`${API_BASE_URL}/colores.json`)

        // Caso 2: el servidor responde con error HTTP
        if (!res.ok) {
          console.error("Error HTTP al cargar colores:", res.status)
          setErrorMsg("No se pudieron cargar los colores. Intentalo más tarde.")
          setColors([])
          setSelectedColorId(null)
          setSelectedColorUri(null)
          return
        }

        const json = (await res.json()) as ColorsResponse
        const data = Array.isArray(json.colores) ? json.colores : []

        // Caso 3: la API responde OK pero no hay colores
        if (data.length === 0) {
          setColors([])
          setSelectedColorId(null)
          setSelectedColorUri(null)
          setErrorMsg("No hay colores disponibles todavía.")
        } else {
          setColors(data)
          const first = data[0]
          setSelectedColorId(first.id)
          setSelectedColorUri(`${API_BASE_URL}/${first.src}`)
          setErrorMsg(null)
        }
      } catch (err) {
        // Caso 4: error de red, parseo, etc.
        console.error("Error cargando colores:", err)
        setErrorMsg("Ocurrió un error al cargar los colores.")
        setColors([])
        setSelectedColorId(null)
        setSelectedColorUri(null)
      } finally {
        setLoading(false)
      }
    }

    loadColors()
  }, [])

  const selectColor = (color: Color) => {
    setSelectedColorId(color.id)

    if (isApiConfigured()) {
      setSelectedColorUri(`${API_BASE_URL}/${color.src}`)
    } else {
      setSelectedColorUri(null)
    }
  }

  const updateColors = (newColors: Color[]) => {
    setColors(newColors)

    // Caso 5: la paleta queda vacía
    if (newColors.length === 0) {
      setSelectedColorId(null)
      setSelectedColorUri(null)
      setErrorMsg("No hay colores en la paleta. Agregá uno con el botón +.")
      return
    }

    // Si no hay color seleccionado, elegimos el primero
    setSelectedColorId((prevSelectedId) => {
      if (prevSelectedId && newColors.some((c) => c.id === prevSelectedId)) {
        // El seleccionado anterior sigue existiendo: lo dejamos
        const stillSelected = newColors.find((c) => c.id === prevSelectedId)!
        if (isApiConfigured()) {
          setSelectedColorUri(`${API_BASE_URL}/${stillSelected.src}`)
        } else {
          setSelectedColorUri(null)
        }
        setErrorMsg(null)
        return prevSelectedId
      }

      // No había seleccionado o ya no existe → seleccionar el primero
      const first = newColors[0]
      if (isApiConfigured()) {
        setSelectedColorUri(`${API_BASE_URL}/${first.src}`)
      } else {
        setSelectedColorUri(null)
      }
      setErrorMsg(null)
      return first.id
    })
  }

  return {
    colors,
    selectedColorId,
    selectedColorUri,
    loading,
    errorMsg,
    selectColor,
    updateColors,
  }
}
