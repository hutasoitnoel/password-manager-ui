import React, { useCallback, useState } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { Label } from '../../../components/ui/label'
import { performOCR } from '../../../helper/axiosHelper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { ktpFormSchema, simFormSchema } from './schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { INITIAL_KTP_FORM, INITIAL_SIM_FORM, KTP_FIELD_LABEL_MAPPER, KTP_FIELD_PLACEHOLDER_MAPPER, ktpFormFields, SIM_FIELD_LABEL_MAPPER, SIM_FIELD_PLACEHOLDER_MAPPER, simFormFields } from '../../../config'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import Dropdown from 'react-bootstrap/Dropdown';
import { IoCloudUpload } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
const IdentityForm = ({
    form,
    resetForm,
    onChangeForm,
    onChangeField,
    onSubmitForm
}: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formType, setFormType] = useState("KTP")

    const formConfig = useForm({
        resolver: zodResolver(formType === 'KTP' ? ktpFormSchema : simFormSchema),
        defaultValues: formType === 'KTP' ? INITIAL_KTP_FORM : INITIAL_SIM_FORM,
    });

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log('ini file')
                console.log(file);

                console.log(binaryStr)

                const formData = new FormData();
                formData.append('image', file);

                try {
                    setIsLoading(true);
                    const response: any = await performOCR(formData);

                    console.log(response)

                    onChangeForm(response.data)

                    setFormType(response.data.type)

                    for (const key in response.data) {
                        formConfig.setValue(key, response.data[key] || "")
                    }
                } catch (error: any) {
                    console.log(error)
                }
                setIsLoading(false)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const renderForm = () => {
        const config = {
            fields: formType === 'KTP' ? ktpFormFields : simFormFields,
            labelMapper: formType === 'KTP' ? KTP_FIELD_LABEL_MAPPER : SIM_FIELD_LABEL_MAPPER,
            placeholderMapper: formType === 'KTP' ? KTP_FIELD_PLACEHOLDER_MAPPER : SIM_FIELD_PLACEHOLDER_MAPPER,
        }

        return config.fields.map((field: any) => (
            <FormField
                key={field}
                control={formConfig.control}
                name={field}
                disabled={isLoading}
                render={({ field: fieldProps }: any) => (
                    <FormItem>
                        <FormLabel>{config.labelMapper[field]}</FormLabel>
                        <FormControl>
                            <Input
                                {...fieldProps}
                                onChange={e => {
                                    fieldProps.onChange(e)
                                    onChangeField(e)
                                }}
                                placeholder={config.placeholderMapper[field]}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        ))
    }

    return (
        <>
            <div {...getRootProps()} className='border hover:cursor-pointer d-flex flex-col justify-center items-center px-5 text-center min-h-48 mb-4'>
                <input {...getInputProps()} />
                {
                    isLoading
                        ? <FiLoader className='text-5xl' />
                        : <>
                            <IoCloudUpload className='text-3xl mb-3' />
                            <Label className='hover:cursor-pointer'>
                                Drop a photo of you identification card here or click here to upload.
                            </Label>
                        </>
                }
            </div >
            <Label>Please select identification type: </Label>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant='default' className='ml-3 p-2'>{formType}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuContent className="z-[9999]">
                        <DropdownMenuItem
                            className='hover:cursor-pointer'
                            onClick={() => {
                                setFormType("KTP")
                                onChangeForm(INITIAL_KTP_FORM)
                                for (const key in INITIAL_KTP_FORM) {
                                    formConfig.setValue(key, "")
                                }
                            }}
                        >
                            KTP
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className='hover:cursor-pointer'
                            onClick={() => {
                                setFormType("SIM")
                                onChangeForm(INITIAL_SIM_FORM)
                                for (const key in INITIAL_SIM_FORM) {
                                    formConfig.setValue(key, "")
                                }
                            }}
                        >
                            SIM
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenuPortal>
            </DropdownMenu>
            <Form {...formConfig}>
                <form onSubmit={formConfig.handleSubmit(onSubmitForm)} className="space-y-4">
                    {renderForm()}
                    <Button type='submit' variant='default'>Confirm</Button>
                </form>
            </Form>
        </>
    )
}

export default IdentityForm