import Link from "next/link"

const PageNotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-3xl mx-auto text-center">
                <div className="relative mx-auto mb-2 md:mb-8 w-32 h-32">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                    <div className="relative bg-blue-500 rounded-full w-32 h-32 flex items-center justify-center">
                        <span className="text-white text-5xl font-bold">404</span>
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-blue-950 mb-4">
                    Page Not Found
                    <span className="block text-blue-500 text-2xl mt-2">
                        We searched everywhere
                    </span>
                </h2>

                <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                    The page you&apos;re looking for seems to have taken an unexpected vacation. Let&apos;s get you back on track.
                </p>

                <Link href={'/'} className="flex flex-wrap justify-center gap-4">
                    <button className="group bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all duration-300">
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Return Home
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound
