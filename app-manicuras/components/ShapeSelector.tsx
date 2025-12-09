// Botones de forma
import React from "react"
import OptionSelector from "@/components/OptionSelector"
import { SHAPE_OPTIONS } from "@/constants/handVariants"

type Props = {
  selectedShapeKey: string
  onChange: (shapeKey: string) => void
}

const ShapeSelector: React.FC<Props> = ({ selectedShapeKey, onChange }) => {
  return (
    <OptionSelector
      title="Forma de uñas"
      options={SHAPE_OPTIONS}
      selectedKey={selectedShapeKey}
      onChange={onChange}
    />
  )
}

export default ShapeSelector


