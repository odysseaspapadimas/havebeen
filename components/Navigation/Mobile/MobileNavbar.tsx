import Link from "next/link";
import { useRouter } from "next/router";

const MobileNavbar = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 z-20 left-0 h-12 w-full bg-slate-900 border-t border-gray-600 flex justify-around items-center">
      <Link href="/places" passHref>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z"
            stroke="#fff"
            strokeWidth={
              router.route.split("/[")[0] === "/places" ? "2.25" : "1.5"
            }
          ></path>
          <path
            d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z"
            stroke="#fff"
            strokeWidth={
              router.route.split("/[")[0] === "/places" ? "2.25" : "1.5"
            }
          ></path>
        </svg>
      </Link>
      <Link href="/add" passHref>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={router.route.split("/[")[0] === "/add" ? "2.5" : "1.5"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Link>
      <Link href="/map" passHref>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={router.route.split("/[")[0] === "/map" ? "2.5" : "1.5"}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      </Link>
    </div>
  );
};
export default MobileNavbar;
