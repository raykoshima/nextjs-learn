import Image from "next/image";
import { validateRequest } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
		redirect("/auth/sign-in");
	}


  return (
  <>
  

  <header className="bg-blue-900 text-white py-20 px-4">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">Welcome to Your Company</h1>
      <p className="mt-4 text-lg md:text-xl">We offer the best homes for sale. Find your dream home today!</p>
      <a href="#" className="mt-8 inline-block px-6 py-3 bg-white text-blue-900 font-bold rounded-full">View Homes</a>
    </div>
  </header>

  <section className="py-20">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <Image src="https://via.placeholder.com/400x250" alt="Property Image" width="400" height="250" className="w-full" />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Beautiful Home</h3>
            <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a href="#" className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-full">View Details</a>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <Image src="https://via.placeholder.com/400x250" alt="Property Image" width="400" height="250" className="w-full" />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Cozy Apartment</h3>
            <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a href="#" className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-full">View Details</a>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <Image src="https://via.placeholder.com/400x250" alt="Property Image" width="400" height="250" className="w-full" />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Modern Condo</h3>
            <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a href="#" className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-full">View Details</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  );
}
