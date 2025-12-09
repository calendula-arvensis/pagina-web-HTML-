// app-manicuras/components/HandLayer.tsx
import React from "react"
import { useHandSelection } from "@/hooks/useHandSelection"
import HandPreview from "@/components/HandPreview"
import HandControls from "@/components/HandControls"

type Props = {
  selectedColorUri: string | null
}

const HandLayer: React.FC<Props> = ({ selectedColorUri }) => {
  const {
    shapeKey,
    lengthKey,
    setShapeKey,
    setLengthKey,
    currentHandImage,
  } = useHandSelection()

  return (
    <>
      <HandPreview
        selectedColorUri={selectedColorUri}
        currentHandImage={currentHandImage}
      />

      <HandControls
        shapeKey={shapeKey}
        lengthKey={lengthKey}
        onShapeChange={setShapeKey}
        onLengthChange={setLengthKey}
      />
    </>
  )
}

export default HandLayer
