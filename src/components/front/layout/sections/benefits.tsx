import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/front/ui/card'
import { Icon } from '@/src/components/front/ui/icon'
import { icons } from 'lucide-react'

interface BenefitsProps {
  icon: string
  title: string
  description: string
}

const benefitList: BenefitsProps[] = [
  {
    icon: 'Blocks',
    title: 'WooCommerce Integration',
    description:
      'Effortlessly connect your WooCommerce store to our app for streamlined digital file and coupon delivery. Manage orders, send gift cards, and track sales all from one platform.',
  },
  {
    icon: 'LineChart',
    title: 'Shopify Integration',
    description:
      'Easily sync your Shopify store for instant delivery of coupons and gift cards. Automate the entire process and enhance your customers shopping experience with our app.',
  },
  {
    icon: 'Wallet',
    title: 'PayPal Button Integration',
    description:
      'Easily generate custom PayPal buttons for each of your products, allowing you to send digital files instantly upon purchase. Simplify payment processing and enhance your customer experience with secure, one-click transactions.     We are actively working on adding more modules and integrations to expand your options and provide even greater flexibility .',
  },
  {
    icon: 'Sparkle',
    title: 'Comprehensive Settings & Transaction Management',
    description:
      'Control every aspect of your transactions with full settings access.',
  },
]

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 lg:pt-5 sm:py-12">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Features</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Seamless Integration with Leading Platforms
          </h2>
          {/* <p className="text-xl text-muted-foreground mb-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
            ducimus reprehenderit architecto rerum similique facere odit
            deleniti necessitatibus quo quae.
          </p> */}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50  hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
