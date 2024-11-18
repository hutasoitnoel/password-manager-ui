import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { CREDENTIALS_FIELD_LABEL_MAPPER, CREDENTIALS_FIELD_PLACEHOLDER_MAPPER, credentialFormFields } from '../../../config';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CredentialForm = ({ form, onChange }: any) => {
    const formSchema = z.object({
        website_name: z.string().min(2, {
            message: 'Website name must be at least 2 characters.',
        }),
        website_url: z.string().url({
            message: 'Enter a valid URL.',
        }),
        username: z.string().min(4, {
            message: 'Username must be at least 4 characters.',
        }),
        password: z.string().min(4, {
            message: 'Password must be at least 4 characters.',
        }),
    });

    // Configure react-hook-form
    const formConfig = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            website_name: form.website_name,
            website_url: form.website_url,
            username: form.username,
            password: form.password,
        },
    });

    // Handle the submission (optional)
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('Form submitted:', data);
    };

    return (
        <div className="mb-3">
            <Form {...formConfig}>
                <form onSubmit={formConfig.handleSubmit(onSubmit)} className="space-y-4">
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
                                            value={form[field]}
                                            onChange={onChange}
                                            placeholder={CREDENTIALS_FIELD_PLACEHOLDER_MAPPER[field]}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </form>
            </Form>
        </div>
    );
};

export default CredentialForm;
