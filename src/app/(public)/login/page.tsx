'use client'

import { Button } from '@/shared/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { ThaiFlag } from '@/shared/icons/thai-flag'
import { LoginFormData, loginFormSchema } from '@/shared/schemas/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function LoginPage() {
   const [showPassword, setShowPassword] = useState(false)

   const form = useForm<LoginFormData>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
         phone: '',
         password: '',
      },
   })

   const onSubmit = (data: LoginFormData) => {
      console.log(data)
   }

   return (
      <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 shadow-lg bg-white text-black flex flex-col gap-4 rounded-2xl">
         <h1 className="text-xl font-semibold">เข้าสู่ระบบเว็บไซต์</h1>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>เบอร์มือถือ</FormLabel>
                        <FormControl>
                           <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                 <ThaiFlag className="w-5 h-auto" />
                              </span>
                              <Input
                                 {...field}
                                 placeholder="0812345678"
                                 onChange={(e) => {
                                    field.onChange(e)
                                 }}
                                 className="pl-10"
                              />
                           </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>รหัสผ่าน</FormLabel>
                        <FormControl>
                           <div className="relative">
                              <Input
                                 type={showPassword ? 'text' : 'password'}
                                 {...field}
                                 onChange={(e) => {
                                    field.onChange(e)
                                    console.log('Password:', e.target.value)
                                 }}
                                 placeholder="กรุณากรอกรหัสผ่าน"
                                 className="pr-10"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowPassword((prev) => !prev)}
                                 className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                 tabIndex={-1}
                              >
                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                           </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                     </FormItem>
                  )}
               />

               <Button type="submit" className="w-full bg-pur-200 hover:bg-pur-300 cursor-pointer">
                  เข้าสู่ระบบ
               </Button>
            </form>
         </Form>
      </div>
   )
}

export default LoginPage
