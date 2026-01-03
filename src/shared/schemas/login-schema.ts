import { z } from 'zod'
export const loginFormSchema = z.object({
   phone: z
      .string()
      .transform((val) => val.replace(/-/g, ''))
      .refine((val) => /^0[689]\d{8}$/.test(val), {
         message: 'เบอร์โทรไม่ถูกต้อง',
      }),
   password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>
