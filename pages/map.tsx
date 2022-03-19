import { NextPageWithAuth } from "./_app";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../helpers/fetcher";
import { Place } from "./places";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

type Coords = {
  lng: number;
  lat: number;
};

type MapOptions = google.maps.MapOptions;

const Map: NextPageWithAuth = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      : "",
  });

  const { data: markerData, error } = useSWR("/api/places/allPlaces", fetcher);

  const router = useRouter();

  const { id } = router.query;

  const [center, setCenter] = useState<Coords>({ lat: 38.22, lng: 21.79 });
  const [zoom, setZoom] = useState(6);
  const mapOptions: MapOptions = useMemo(
    () => ({
      mapId: "f57df7f7477ca9eb",
    }),
    []
  );
  const [selectedPlace, setSelectedPlace] = useState<Place>();

  useEffect(() => {
    if (id && markerData && !error) {
      console.log(markerData);
      for (const marker of markerData) {
        if (id === marker._id) {
          setCenter({ lat: marker.coords.lat, lng: marker.coords.lng });
          setZoom(10);
          break;
        }
      }
    }
  }, [id, markerData, error]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePlaceClick = (place: Place) => {
    openModal();

    setSelectedPlace(place);
  };

  const markers =
    markerData &&
    !error &&
    markerData.map((place: Place, i: number) => (
      <Marker
        key={i}
        onClick={() => handlePlaceClick(place)}
        position={place.coords}
      />
    ));

  return (
    <div className="w-full h-nav sm:h-full z-40">
      {selectedPlace && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                  <Dialog.Title
                    as="h3"
                    className="text-xl md:text-2xl font-medium md:font-semibold leading-6 text-gray-900"
                  >
                    {selectedPlace.name}
                  </Dialog.Title>
                  <div className="flex flex-col justify-between items-start">
                    <div className="mt-2">
                      <p className="text-sm md:text-base text-black">
                        {selectedPlace.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center space-x-2 self-end">
                      <Link href={`/places/${selectedPlace._id}`} passHref>
                        <div className="bg-red-500 p-2 rounded-md cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                      </Link>
                      <button
                        onClick={closeModal}
                        className="bg-slate-800 p-2 rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            width: "30vw !important",
            padding: "1rem 2rem",
            background: "#0b0e11",
            color: "#fff",
          },
        }}
      />
      {isLoaded && (
        <GoogleMap
          mapContainerClassName="w-full h-nav sm:h-full"
          center={center}
          zoom={zoom}
          options={mapOptions}
        >
          {markers}
        </GoogleMap>
      )}
    </div>
  );
};

Map.requireAuth = true;

export default Map;
