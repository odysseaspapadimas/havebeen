import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { NextPageWithAuth } from "./_app";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import Place from "../components/Places/Place";

type Coords = {
  lat: number;
  lng: number;
};

export type Place = {
  _id: string;
  coords: Coords;
  description: string;
  name: string;
  country: string;
  date: string;
};

const Places: NextPageWithAuth = () => {
  const { data: session, status } = useSession();

  const { data: places, error } = useSWR("/api/places/allPlaces", fetcher);

  const doesUserExist = async () => {
    const res = await fetch("/api/user/userExists");

    const exists = await res.json();

    if (!exists) {
      const res = await fetch("/api/user/createUser");
      const data = await res.json();
      console.log(data, "created");
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      //Check if user exists

      doesUserExist();
    }
  }, [session, status]);

  return (
    <div className="flex flex-col justify-around items-center space-y-4 pt-4 pb-16 sm:pb-4">
      {!error &&
        places &&
        places.map((place: Place, i: number) => (
          <Place key={i} place={place} />
        ))}
    </div>
  );
};

Places.requireAuth = true;

export default Places;
