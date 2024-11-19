import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { CREDENTIALS_FIELD_LABEL_MAPPER, CREDENTIALS_FIELD_PLACEHOLDER_MAPPER, credentialFormFields } from '../../../config';
import { formSchema } from './config'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '../../../components/ui/label';

const CredentialForm = ({
    form,
    onChange,
    formMode,
    onSubmitForm
}: any) => {
    const formConfig = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            website_name: form.website_name,
            website_url: form.website_url,
            username: form.username,
            password: form.password,
        },
    });

    return (
        <div className="mb-3">
            <Label className='text-xl mb-2'>
                {formMode === 'CREATE' ? 'Creating a new' : 'Editing'} credential
            </Label>
            <Form {...formConfig}>
                <form onSubmit={formConfig.handleSubmit(onSubmitForm)} className="space-y-4">
                    {credentialFormFields.map((field) => (
                        <FormField
                            key={field}
                            control={formConfig.control}
                            name={field}
                            render={({ field: fieldProps }: any) => (
                                <FormItem>
                                    <FormLabel>{CREDENTIALS_FIELD_LABEL_MAPPER[field]}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...fieldProps}
                                            onChange={e => {
                                                fieldProps.onChange(e)
                                                onChange(e)
                                            }}
                                            placeholder={CREDENTIALS_FIELD_PLACEHOLDER_MAPPER[field]}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button type='submit' variant='default'>Confirm</Button>
                </form>
            </Form>
        </div>
    );
};

export default CredentialForm;
