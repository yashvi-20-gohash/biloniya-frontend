"use client"

// components/ContactSection.tsx
import { ContactUsSchema } from '@/src/schema/contact';
import { useContactUsStore } from '@/src/store/website/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { TextField } from '../../ui/form/input';
import { TextAreaField } from '../../ui/form/textarea';
import LoadingButton from '../../ui/loading-button';

// Define types for the contact info structure
interface ContactDetail {
  type?: 'tel' | 'email';  // Optional, can be tel or email
  href: string;
  value: string;
}

interface ContactItem {
  title: string;
  icon: JSX.Element;
  details: ContactDetail[];
}

// Contact info data with types
const contactInfo: ContactItem[] = [
  {
    title: 'Phone',
    icon: <Phone className="w-6 h-6 text-white" />,
    details: [
      { type: 'tel', href: 'tel:+990-737621432', value: '+990-737 621 432' },
      { type: 'tel', href: 'tel:+990-137324465', value: '+990-137 324 465' },
    ],
  },
  {
    title: 'Email Now',
    icon: <Mail className="w-6 h-6 text-white" />,
    details: [
      { type: 'email', href: 'mailto:info@example.com', value: 'info@example.com' },
      { type: 'email', href: 'mailto:example@example.com', value: 'example@example.com' },
    ],
  },
  {
    title: 'Location',
    icon: <MapPin className="w-6 h-6 text-white" />,
    details: [
      {
        value: 'Vivek Vihar Metro Station, Jaipur, Rajasthan 302019',
        href: ''
      },
    ],
  },
  {
    title: 'Opening Time',
    icon: <Calendar className="w-6 h-6 text-white" />,
    details: [
      {
        value: '8:00Am - 10:Pm, Friday Close',
        href: ''
      },
    ],
  },
];

// Define the component
export type ContactUsFormValue = z.infer<typeof ContactUsSchema>
const ContactSection: React.FC = () => {

  const { addContact, addContactLoading } = useContactUsStore()

  const defaultValues: ContactUsFormValue = {
    name: '',
    phone: '',
    email: '',
    message: '',
  }

  const formMethods = useForm<ContactUsFormValue>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues,
  })

  const { control, handleSubmit, reset } = formMethods

  const onSubmit = async (data: ContactUsFormValue) => {
    reset()
    await addContact(data)
  }
  return (
    <div className="w-full max-w-7xl mx-auto p-8 pt-8">

      <div className="flex items-center font-secound justify-center gap-2 mb-4">
        <span className="text-xl">  <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill='#b0191e'
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.92556 7.69046C2.35744 7.63298 2.78906 7.57563 3.21925 7.51077C4.14925 7.37065 5.08588 7.29138 6.01763 7.21249L6.01888 7.21243C6.15888 7.20055 6.29875 7.18874 6.43844 7.17668C7.50663 6.968 8.58732 6.89083 9.66644 6.94628C10.7733 7.06837 11.8592 7.41421 12.8857 7.97163L12.8857 8.23655C11.8592 8.79397 10.7733 9.13981 9.66644 9.26191C8.58732 9.31735 7.50663 9.24018 6.43844 9.03151C5.36831 8.93932 4.29813 8.82412 3.21925 8.69742C2.14031 8.57065 1.07012 8.42092 -6.78702e-07 8.23655L-7.01862e-07 7.97163C0.639938 7.86135 1.28306 7.77588 1.92556 7.69046ZM10.7633 15.8502C10.9332 15.4596 11.12 15.0855 11.3061 14.7127C11.389 14.5468 11.4717 14.3811 11.5527 14.2144C11.8159 13.6729 12.1141 13.1545 12.4299 12.6477C12.5448 12.4632 12.64 12.2604 12.7336 12.061C12.8972 11.7124 13.056 11.3741 13.3071 11.1616C13.7816 10.7768 14.3283 10.5734 14.886 10.574L15 10.7353C14.9945 11.4677 14.8235 12.1813 14.5088 12.7859C14.3311 13.1802 14.0336 13.4059 13.7358 13.6317C13.6073 13.7292 13.4787 13.8268 13.3597 13.9379C12.965 14.3066 12.5615 14.6637 12.1492 15.0093C11.7369 15.3549 11.3159 15.689 10.8685 16L10.7633 15.8502ZM11.7543 0.665536C11.4882 0.436859 11.2226 0.208798 10.9388 -1.5523e-06L10.816 0.149784C11.0528 0.725784 11.3072 1.27877 11.5703 1.82018C11.8335 2.3616 12.1142 2.89157 12.3949 3.40997C12.4795 3.56628 12.5538 3.73514 12.628 3.90394C12.8 4.29501 12.9718 4.68572 13.2721 4.91908C13.7312 5.33563 14.2754 5.56049 14.8334 5.56418L14.9562 5.4144C14.9651 4.68055 14.8095 3.95951 14.5089 3.3408C14.3471 3.01108 14.0894 2.80252 13.824 2.58763C13.6722 2.46474 13.5178 2.33975 13.3773 2.1888C12.9914 1.77409 12.6142 1.3824 12.1931 1.0368C12.0446 0.91489 11.8994 0.790152 11.7543 0.665536Z"
          ></path>
        </svg>
        </span>
        <span className='text-[#b0191e]'> Contact Form </span>
        <span className="text-xl"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill='#b0191e'
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.0744 8.30954C12.6426 8.36702 12.2109 8.42437 11.7807 8.48923C10.8507 8.62935 9.91412 8.70862 8.98237 8.78751L8.98112 8.78757C8.84112 8.79945 8.70125 8.81126 8.56156 8.82332C7.49337 9.032 6.41268 9.10917 5.33356 9.05372C4.22669 8.93163 3.14081 8.58578 2.11432 8.02837V7.76345C3.14081 7.20603 4.22669 6.86018 5.33356 6.73809C6.41268 6.68265 7.49337 6.75982 8.56156 6.96849C9.63169 7.06068 10.7019 7.17588 11.7807 7.30259C12.8597 7.42935 13.9299 7.57908 15 7.76345V8.02837C14.3601 8.13865 13.7169 8.22412 13.0744 8.30954ZM4.23673 0.14976C4.06677 0.540388 3.88 0.914468 3.69388 1.28726C3.61104 1.45317 3.52831 1.61887 3.44728 1.78561C3.18413 2.32705 2.88589 2.84546 2.57011 3.35234C2.45519 3.5368 2.36002 3.73958 2.26642 3.939C2.10282 4.28757 1.94402 4.62593 1.69294 4.83843C1.21844 5.2232 0.671682 5.42665 0.114031 5.42597L0 5.26468C0.00551875 4.53235 0.176481 3.81866 0.491219 3.2141C0.6689 2.81982 0.966407 2.59414 1.26418 2.36828C1.39271 2.27078 1.52129 2.17324 1.64031 2.06209C2.03504 1.69345 2.43853 1.33633 2.8508 0.990726C3.26307 0.645126 3.68411 0.31104 4.13147 0L4.23673 0.14976ZM3.24568 15.3345C3.51184 15.5631 3.77735 15.7912 4.06123 16L4.18404 15.8502C3.9472 15.2742 3.69281 14.7212 3.42966 14.1798C3.16651 13.6384 2.88581 13.1084 2.60511 12.59C2.52048 12.4337 2.44621 12.2649 2.37198 12.0961C2.19999 11.705 2.02816 11.3143 1.72794 11.0809C1.26879 10.6644 0.7246 10.4395 0.166563 10.4358L0.0437562 10.5856C0.0348937 11.3194 0.190456 12.0405 0.491113 12.6592C0.652919 12.9889 0.910556 13.1975 1.17597 13.4124C1.32782 13.5353 1.48222 13.6602 1.62268 13.8112C2.00863 14.2259 2.38582 14.6176 2.80686 14.9632C2.95538 15.0851 3.10063 15.2098 3.24568 15.3345Z"
          ></path>
        </svg></span>
      </div>

      <h2 className="lg:text-4xl text-xl font-bold text-center mb-12"> Reach Us Anytime
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left Column - Contact Info */}
        <div className="space-y-8">
          {contactInfo.map((item, index) => (
            <div key={index} className="border border-[#fbb4b6] rounded-lg p-6 relative">
              <h6 className="text-gray-600 font-medium  bg-white text-sm w-fit absolute top-[-11px] px-2 left-4">{item.title}</h6>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#b0191e] rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  {item.details.map((detail, idx) => (
                    <a
                      key={idx}
                      href={detail.href || '#'}
                      className="block text-gray-800 hover:text-[#b0191e] transition-colors"
                    >
                      {detail.value}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}


        </div>

        {/* Right Column - Contact Form */}
        <div className=" bg-white p-8 rounded-xl border border-gray-100">
          <div className="">
            <FormProvider {...formMethods}>
              <form
                id="contact-form"
                className="py-3 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              // onKeyDown={handleKeyDown}
              >
                <p className="mb-0 text-red-500" id="error-msg"></p>

                <div className="grid lg:grid-cols-12 lg:gap-6">
                  <div className="lg:col-span-6 mb-5">
                    <TextField name="name" control={control} label="Name" />
                  </div>

                  <div className="lg:col-span-6 mb-5">
                    <TextField
                      name="phone"
                      control={control}
                      label="Phone"
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 lg:gap-6">
                  <div className="lg:col-span-12 mb-5">
                    <TextField
                      name="email"
                      control={control}
                      label="Email"
                      required={true}
                    />
                  </div>

                </div>


                <div className="grid grid-cols-1 mb-4">
                  <TextAreaField
                    name="message"
                    label="Message"
                    control={control}
                  />
                </div>

                <LoadingButton
                  type="submit"
                  isLoading={addContactLoading}
                  form="contact-form"
                >
                  Submit
                </LoadingButton>
              </form>
            </FormProvider>
          </div>
        </div>

      </div>

      <div className="w-full h-80 mt-4 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56956.85571766264!2d75.73873087821602!3d26.846202113681322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4052a8af82b%3A0x7ef9a10baae65f88!2sBiloniya%20Enterprises!5e0!3m2!1sen!2sin!4v1737024366749!5m2!1sen!2sin"
          className="w-full h-full"
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactSection;
