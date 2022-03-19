import Link from "next/link";
import { Fragment, useState } from "react";
import { Place } from "../../pages/places";

import { Dialog, Transition } from "@headlessui/react";
import { useSWRConfig } from "swr";
import toast, { Toaster } from "react-hot-toast";

const Place = ({ place }: { place: Place }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useSWRConfig();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/places/deletePlace?id=${place._id}`);

    const response = await res.json();

    closeModal();

    if (response) {
      mutate("/api/places/allPlaces");
      console.log("successfull delete, ezbaby");
      toast.success("Place succesfully deleted.");
    }
  };

  return (
    <>
      <div className="w-[65vw] max-w-3xl bg-slate-800 border flex flex-col border-gray-100 rounded-md p-2 z-10">
        <p className="border-b border-white max-w-max ">{place.date}</p>
        <div className="text-center w-full grid place-items-center">
          <p className="text-lg md:text-2xl font-semibold my-4 border-b-[3px] px-2 border-white ">
            {place.name}
          </p>
        </div>
        <p className="px-2 md:text-xl">{place.description}</p>
        <div className="self-end mt-2 flex items-center space-x-2">
          <Link href={`/places/${place._id}`} passHref>
            <button className="bg-red-500 text-white p-2 rounded-md mt-2 self-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </Link>
          <Link href={`/map?id=${place._id}`} passHref>
            <button className="bg-red-500 text-white p-2 rounded-md mt-2 self-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </button>
          </Link>
          <button
            onClick={openModal}
            className="bg-white text-red-500 p-2 rounded-md mt-2 self-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
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
                    className="text-xl md:text-3xl font-semibold md:font-semibold leading-6 text-gray-900"
                  >
                    Delete place?
                  </Dialog.Title>
                  <div className="flex flex-col justify-between items-start">
                    <div className="mt-2">
                      <p className="text-black">
                        Are you sure you want to delete this place? This action
                        is irreversible.
                      </p>
                    </div>

                    <div className="mt-4 flex items-center space-x-2 self-end">
                      <button
                        onClick={closeModal}
                        className="bg-slate-800 p-3 rounded-md"
                      >
                        No
                      </button>
                      <button
                        onClick={handleDelete}
                        className="bg-red-500 p-3 rounded-md cursor-pointer"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            width: '30vw !important',
            padding: "1rem 2rem",
            background: "#0b0e11",
            color: "#fff",
          },
        }}
      />
    </>
  );
};
export default Place;
