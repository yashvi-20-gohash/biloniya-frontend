import ResetPasswordPageClient from "@/src/components/super-admin/resetPassword/resetpassword"

export const metadata = {
  title: `Biloniya - Reset Password`,
  description: 'Reset your password by entering your email address.',
}
export default function ResetPasswordPage({
  params,
}: {
  params: { token: string }
}) {
  return <ResetPasswordPageClient token={params.token} />
}
