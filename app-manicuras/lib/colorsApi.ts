// Se encarga de todo lo relacionado con la POST de colores al backend
import type { Color } from "@/types/color"
import type { PredefinedColor } from "@/constants/predefinedColors"

export async function addPredefinedColorToApi(
  predef: PredefinedColor,
  apiBaseUrl: string,
): Promise<Color> {
  const newColorToSend: Color = {
    id: `predef-${predef.key}-${Date.now()}`,
    src: predef.src,
  }

  const res = await fetch(`${apiBaseUrl}/api/colores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newColorToSend),
  })

  if (!res.ok) {
    throw new Error(`Error HTTP al agregar color: ${res.status}`)
  }

  const savedColor: Color = await res.json()
  return savedColor
}
