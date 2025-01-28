import FooterSection from '@/src/components/front/layout/sections/footer'
import HeaderSection from '@/src/components/front/layout/sections/header'
import { ReactNode } from 'react'

// ----------------------------------------------------------------------

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <HeaderSection />
            {children}
            <FooterSection />
        </div>

    )
}
