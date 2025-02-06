"use client"; 
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; 

export default function PaymentSuccess() {
  const searchParams = useSearchParams(); 
  const amount = searchParams.get("amount"); 
  return (
    <div>
    <main className="mt-20 flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-blue-400">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Thank You!
        </h1>
        <h2 className="text-lg font-semibold text-gray-700">
          Payment Successful!
        </h2>

        <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl text-white">
          <h3 className="text-xl font-semibold">Amount Paid</h3>
          <div className="mt-2 text-3xl font-bold">
            ${amount}
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>Your car rental is being processed. We&apos;ll send you the details shortly.</p>
        </div>

        <div className="mt-8">
          <Link href={"/"}>
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full shadow-md transition duration-300"
            >
              Go Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
    </div>
  );
}
