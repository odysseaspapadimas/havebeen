import { NextPageWithAuth } from "./_app";
import { useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

interface Place {
  name: string;
  country: string;
  coords: {
    lat: number | undefined;
    lng: number | undefined;
  };
}

const Add: NextPageWithAuth = () => {
  const { data: session } = useSession();

  const [selectedPlace, setSelectedPlace] = useState<Place>();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

  const [disabled, setDisabled] = useState(false);

  const onSelect = (place: google.maps.places.PlaceResult) => {
    const name = place.address_components?.at(0)?.long_name;
    const country = place.address_components?.at(-1)?.long_name;
    const coords = {
      lat: place.geometry?.location?.lat(),
      lng: place.geometry?.location?.lng(),
    };

    if (name && country && coords) {
      setSelectedPlace({ name, country, coords });
    }
  };

  const handleAdd = async () => {
    if (date && description && selectedPlace) {
      setDisabled(true);
      const place = {
        ...selectedPlace,
        description,
        date: format(date, "MMMM dd, y"),
        user: session?.user?.email,
      };

      const res = await fetch("/api/places/addPlace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      const data = await res.json();

      if (data) {
        setDisabled(false);

        setDescription("");
        setSelectedPlace(undefined);
      }

      console.log(data);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center space-y-8">
      <ReactGoogleAutocomplete
        className="text-black p-4 mt-8 rounded-md"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        onPlaceSelected={onSelect}
      />

      <input
        type="text"
        className="text-black p-4 rounded-md"
        placeholder="Enter a description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <DatePicker
          selected={date}
          className="text-black rounded-md p-2 text-lg font-medium"
          onChange={(date) => setDate(date)}
        />
      </div>

      <button
        className="bg-red-500 px-3 py-4 text-lg font-medium rounded-md disabled:cursor-not-allowed disabled:bg-red-400"
        disabled={!!!selectedPlace || !!!description || disabled}
        onClick={handleAdd}
      >
        Add Place
      </button>
    </div>
  );
};

Add.requireAuth = true;

export default Add;
