import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/front/ui/card'
import { Icon } from '@/src/components/front/ui/icon'
import { icons } from 'lucide-react'

interface FeaturesProps {
  icon: string
  title: string
  description: string
}

const featureList: FeaturesProps[] = [
  {
    icon: 'TabletSmartphone',
    title: ' Centralized Store Management  ',
    description:
      'Seamlessly manage all your stores and brands from a single, user-friendly platform.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Instant Email & Download',
    description:
      'Deliver coupons, gift cards, or digital files instantly via email or allow customers to download directly.',
  },
  {
    icon: 'Goal',
    title: '	Advanced Fraud Protection',
    description:
      'Protect your business with built-in fraud detection and prevention tools, ensuring secure transactions.',
  },
  {
    icon: 'PictureInPicture',
    title: 'Effortless Refund Processing',
    description:
      'Process refunds directly from the app, offering a smooth and hassle-free experience for your customers.',
  },
  {
    icon: 'MousePointerClick',
    title: 'Resend with One Click',
    description:
      'Quickly resend digital files or coupons to customers in just one click, minimizing any delays.',
  },
  {
    icon: 'Newspaper',
    title: ' Easy Replacement Handling',
    description:
      'Offer seamless replacement of coupons or gift cards, ensuring customer satisfaction.',
  },

  {
    icon: 'PictureInPicture',
    title: ' Comprehensive Sales Analytics',
    description:
      'Access powerful sales analysis tools to track performance, monitor trends, and make data-driven decisions.',
  },
  {
    icon: 'MousePointerClick',
    title: 'Customer History & Records',
    description:
      'Maintain detailed customer records, including first purchase details and full transaction history for deeper insights.',
  },
  {
    icon: 'Newspaper',
    title: ' Low Inventory Alerts',
    description:
      'Receive real-time alerts when inventory levels are running low, ensuring you never run out of stock.',
  },
  {
    icon: 'PictureInPicture',
    title: ' Product Selling Restrictions',
    description:
      'Set custom restrictions on certain products or regions, giving you full control over your sales and offers.',
  },
  {
    icon: 'MousePointerClick',
    title: 'Bonus Code Distribution',
    description:
      'Easily send bonus codes or promotional offers directly to customers, boosting engagement and loyalty.',
  },
  {
    icon: 'Newspaper',
    title: '	Unlimited Custom SMTP',
    description:
      "Integrate with any email provider of your choice using unlimited custom SMTP. Whether you're using a private server or a third-party service, our platform gives you the freedom to configure and send emails from any SMTP server without limits.",
  },

  {
    icon: 'PictureInPicture',
    title: '	Unlimited Storage',
    description:
      'Store and manage all your digital files with ease. Our unlimited storage ensures that you never run out of space, no matter how large your file library grows. Enjoy peace of mind with secure, scalable storage for all your digital assets.',
  },
  {
    icon: 'MousePointerClick',
    title: '	Secure File Management',
    description:
      ': Keep your digital assets safe with industry-leading encryption and robust security protocols. Our platform ensures that every file you send is protected from unauthorized access, giving you peace of mind with every transaction.',
  },
  {
    icon: 'Newspaper',
    title: 'Detailed Download Tracking: ',
    description:
      'Stay informed with real-time download tracking. Know exactly when and where your customers access their files, including IP address monitoring, so you can ensure delivery and gain insights into customer engagement.',
  },
]

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-10 sm:py-12">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4 pb-12">
        Key Features of Our Digital File & Coupon Delivery App:
      </h2>

      {/* <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem fugiat, odit
        similique quasi sint reiciendis quidem iure veritatis optio facere tenetur.
      </h3> */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
