import { PartnerLayout } from '@/components/layout/PartnerLayout'

export default function PartnerRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PartnerLayout>{children}</PartnerLayout>
}
