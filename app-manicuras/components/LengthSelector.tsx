// Boton de largo
import React from "react"
import OptionSelector from "@/components/OptionSelector"
import { LENGTH_OPTIONS, LengthKey } from "@/constants/handVariants"

type Props = {
  lengthKey: LengthKey
  onChange: (lengthKey: LengthKey) => void
}

const LengthSelector: React.FC<Props> = ({ lengthKey, onChange }) => {
  return (
    <OptionSelector
      title="Largo de uñas"
      options={LENGTH_OPTIONS}
      selectedKey={lengthKey}
      onChange={(key) => onChange(key as LengthKey)}
    />
  )
}

export default LengthSelector
