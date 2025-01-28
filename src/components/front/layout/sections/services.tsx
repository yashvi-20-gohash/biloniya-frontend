import { Badge } from '@/src/components/front/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/front/ui/card'

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string
  pro: ProService
  description: string
}
const serviceList: ServiceProps[] = [
  {
    title: '	No subscriptions, no contracts ',
    description: 'Use our platform as needed without long-term commitments.',
    pro: 0,
  },
  {
    title: 'Pay only for what you send ',
    description:
      'Whether you sending a few files or managing thousands, you only pay for what you send.',
    pro: 0,
  },
  {
    title: 'Scale effortlessly ',
    description:
      'From small businesses to enterprises, our pay-as-you-go model works for everyone, scaling with your needs.',
    pro: 0,
  },
  {
    title: '	Transparent pricing ',
    description:
      'Get complete visibility into your spending with clear, upfront costs.',
    pro: 1,
  },
]

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-4 sm:py-6">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Services
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4 ">
        {' '}
        Simple, Flexible Pricing — Pay As You Go{' '}
      </h2>
      <h3 className="max-w-[800px] mx-auto text-lg text-center text-muted-foreground mb-12">
        Why pay for more than you need? With our Digital File & Coupon Delivery
        App, there are no confusing packages or subscriptions. You only pay for
        what you use, giving you total control over your costs.
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60  h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  )
}
