'use client'

import apiService from "@/app/services/apiService"
import { useEffect, useState } from "react"

import PropertyListItem from "@/app/components/properties/PropertyListItem"
import useSearchModal from "@/app/hooks/useSearchModal"
import { format } from "date-fns"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export type PropertyType = {
  id: string;
  title: string;
  image_url: string
  price_per_night: number;
  is_favorite: boolean;
}

interface PropertyListProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
}

const PropertyList = ({ landlord_id, favorites }: PropertyListProps) => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const numGuests = searchModal.query.guests;
  const numBathrooms = searchModal.query.bathrooms;
  const numBedrooms = searchModal.query.bedrooms;
  const checkinDate = searchModal.query.checkIn;
  const checkoutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id == id) {
        property.is_favorite = is_favorite

        if (is_favorite) {
          console.log('added to list of favorited properties')
        } else {
          console.log('removed from list')
        }
      }

      return property;
    })

    setProperties(tmpProperties);
  }

  const getProperties = async () => {
    setIsLoading(true);
    let url = '/api/properties/';

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    } else if (favorites) {
      url+= '?is_favorites=true'
    } else {
      let urlQuery = '';

      if (country) {
        urlQuery += '&country=' + country
      }

      if (numGuests) {
        urlQuery += '&numGuests=' + numGuests
      }

      if (numBedrooms) {
        urlQuery += '&numBedrooms=' + numBedrooms
      }

      if (numBathrooms) {
        urlQuery += '&numBathrooms=' + numBathrooms
      }

      if (category) {
        urlQuery += '&category=' + category
      }

      if (checkinDate) {
        urlQuery += '&checkin=' + format(checkinDate,'yyyy-MM-dd')
      }

      if (checkoutDate) {
        urlQuery += '&checkout=' + format(checkoutDate,'yyyy-MM-dd')
      }

      if (urlQuery.length) {
        console.log('Query: ', urlQuery);
        urlQuery = '?' + urlQuery.substring(1);
        url += urlQuery;
      }
    }

    try {
      const tmpProperties = await apiService.get(url)

      setProperties(tmpProperties.data.map((property: PropertyType) => {
        if (tmpProperties.favorites.includes(property.id)) {
          property.is_favorite = true
        } else {
          property.is_favorite = false
        }

        return property
      }));
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProperties();
    console.log({ params });
  }, [category, searchModal.query, params]);

  // Loading State with local cat image
    if (isLoading) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center text-center">
          <div className="relative h-[50vh] w-full mb-6">
            <Image
              src="/loading-cat.png"
              alt="Loading properties..."
              fill
              className="object-contain animate-pulse"
            />
          </div>
          <p className="text-3xl font-bold text-gray-500 mb-3">Looking for properties...</p>
        </div>
      );
    }

    // Empty State with local cat image
    if (properties.length === 0) {
      console.log("NO PROPERTIES")
      return (
        <div className="col-span-full flex flex-col items-center justify-center text-center">
          <div className="relative h-[50vh] w-full mb-4">
            <Image
              src="/empty-cat.webp"
              alt="No properties found"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">No properties found!</h2>
          {/*<p className="text-gray-500 text-lg">Try adjusting your filters, searching a different location, or removing some guests.</p>*/}
        </div>
      );
    }

  return (
    <>
      {properties.map(property => {
        return (
          <PropertyListItem
            key={property.id}
            property={property}
            markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
          />
        )
      })}
    </>
  )
}

export default PropertyList
