import PropertyList from "@/app/components/properties/PropertyList";
import { getUserId } from "../lib/actions";
import Link from "next/link";

const MyPropertiesPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] mx-auto px-6 py-12 flex flex-col items-center justify-center mt-20">
        <p className="text-xl text-gray-600 mb-6">You need to be authenticated to view your properties.</p>
        <Link href="/" className="px-6 py-3 bg-airbnb text-white rounded-xl hover:bg-rose-600 transition">
          Return Home
        </Link>
      </main>
    );
  }
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <PropertyList landlord_id={userId}  />
      </div>
    </main>
  );
}

export default MyPropertiesPage;
