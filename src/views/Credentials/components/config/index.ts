import z from 'zod'

export const formSchema = z.object({
    website_name: z.string().min(1, {
        message: 'Please enter the website name',
    }),
    website_url: z.string().url({
        message: 'Please enter a valid URL',
    }).optional(),
    username: z.string().min(1, {
        message: 'Please enter the username/email',
    }),
    password: z.string().min(1, {
        message: 'Please enter the password',
    }),
});
