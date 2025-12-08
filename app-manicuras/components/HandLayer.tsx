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
    lengthIndex,
    setShapeKey,
    setLengthIndex,
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
        lengthIndex={lengthIndex}
        onShapeChange={setShapeKey}
        onLengthChange={setLengthIndex}
      />
    </>
  )
}

export default HandLayer