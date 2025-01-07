import React from 'react'

const BookAppointmentBox = () => {
    return (
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center lg:text-left">Ready to book your appointment?</h3>
                    <p className="text-blue-100 text-center lg:text-left">Join thousands of patients who trust our platform</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 bg-white text-blue-500 rounded-full hover:bg-blue-50 transition-colors font-medium whitespace-nowrap">
                        Find a Doctor
                    </button>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-400 border border-blue-300 transition-colors font-medium whitespace-nowrap">
                        View Specialists
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookAppointmentBox