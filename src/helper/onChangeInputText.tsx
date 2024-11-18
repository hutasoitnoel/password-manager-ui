import React from "react"
import { CredentialFormType } from "../views/Credentials/types"

export const onChangeInputText = (
    e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<CredentialFormType>>
) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
}