import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/front/ui/card'
import { Check } from 'lucide-react'

const creditRanges = [
  {
    title: '1 - 100',
    value: '$5',
    description: 'Per credit value for 1 to 100 credits',
  },
  {
    title: '101 - 200',
    value: '$4',
    description: 'Per credit value for 101 to 200 credits',
  },
  {
    title: '201 - Above',
    value: '$3',
    description: 'Per credit value for 201 to Above credits',
  },
]

export const PricingSection = () => {
  return (
    <section className="container py-10 sm:py-20">
      <h2 className="text-sm text-primary text-center mb-2 tracking-wide">
        Credits and Values
      </h2>

      <h2 className="text-2xl md:text-3xl text-center font-semibold mb-3">
        Choose your Credit Range
      </h2>

      <h3 className="md:w-1/2 mx-auto text-lg text-center text-muted-foreground pb-10">
        The more credits you purchase, the lower the cost per credit.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
        {creditRanges.map(({ title, value, description }) => (
          <Card
            key={title}
            className="drop-shadow-xl shadow-black/10  border-[1.5px] border-primary lg:scale-[1.05]"
          >
            <CardHeader>
              <CardTitle className="pb-2">{title}</CardTitle>

              <CardDescription className="pb-4">{description}</CardDescription>

              <div>
                <span className="text-3xl font-bold">{value}</span>
                <span className="text-muted-foreground"> /credit</span>
              </div>
            </CardHeader>

            <CardContent className="flex justify-center">
              <div className="space-y-2">
                <span className="flex">
                  <Check className="text-primary mr-2" />
                  <h3>Lower rates for more credits</h3>
                </span>
                <span className="flex">
                  <Check className="text-primary mr-2" />
                  <h3>Best for frequent users</h3>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
