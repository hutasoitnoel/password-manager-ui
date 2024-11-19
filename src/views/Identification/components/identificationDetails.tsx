import { Label } from "../../../components/ui/label"
import { KTP_FIELD_LABEL_MAPPER, ktpFormFields, SIM_FIELD_LABEL_MAPPER, simFormFields } from "../../../config"

const IdentificationDetails = ({
    identification
}: any) => {
    const type = identification.type

    const fields = type === 'KTP' ? ktpFormFields : simFormFields
    const labelMapper = type === 'KTP' ? KTP_FIELD_LABEL_MAPPER : SIM_FIELD_LABEL_MAPPER

    return <>
        <Label className="text-2xl mb-4">Identification details</Label>
        <Label className="d-block text-lg font-semibold">ID Type</Label>
        <Label className="mb-3 text-md">{identification.type || '-'}</Label>
        {fields.map((field: any) => {
            return <div>
                <Label className="d-block text-lg font-semibold">{labelMapper[field]}</Label>
                <Label className="mb-3 text-md">{identification[field] || '-'}</Label>
            </div>
        })}
    </>
}

export default IdentificationDetails