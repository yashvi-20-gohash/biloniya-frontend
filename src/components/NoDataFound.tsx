import type { NextPage } from 'next'
import Image from 'next/image'
const NoDataFound: NextPage<{ title: string; message?: React.ReactNode }> = ({
  message,
  title,
}: {
  title?: React.ReactNode
  message?: React.ReactNode
}) => {
  return (
    <div className="w-full">
      <div className="p-12 text-center">
        <Image
          className="mx-auto mb-7"
          src="/no-data-found.png"
          alt="not found"
          width={100}
          height={100}
        />
        <h3 className="font-heading mb-3 text-lg font-semibold  text-black">
          {title}
        </h3>
        {message}
      </div>
    </div>
  )
}

export default NoDataFound
