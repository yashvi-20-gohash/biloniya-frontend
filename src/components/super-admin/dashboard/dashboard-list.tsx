'use client'
import { DashboardContactUsTable } from "./contact-us/table/client"
import { SuperAdminDashboardStore } from "@/src/store/dashboard"

export default function DashboardList() {


    const { contactDashboardListData } = SuperAdminDashboardStore()
    const bookings = [
        { label: 'Contact Us', value: contactDashboardListData?.totalContactUsCount || 0 },
    ]

    return (
        <section className="max-w-screen-xl mx-auto">
            <div className="flex items-center justify-between py-3">
                <h5 className="mb-5 mt-6 font-semibold text-xl">
                    Hello!, Good morning
                </h5>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-2 gap-10 mb-5">
                {bookings.map((booking, index) => (
                    <div key={index} className="border border-gray-500 p-4 rounded-lg">
                        <h5 className="mb-4 text-black font-normal text-center">
                            {booking.label}
                        </h5>
                        <p className="text-sm text-gray-400 text-center">
                            {booking.value}
                        </p>
                    </div>
                ))}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-5">
                <DashboardContactUsTable />
            </div>

        </section>
    )
}
