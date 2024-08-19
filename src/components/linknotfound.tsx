import Image from "next/image";
import Notfound from "../../public/Notfound.jpg"
function LinkNotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-4 gap-2 text-center text-VeryDarkBlue">
      <p className="font-semibold">404...Notfound</p>
      <Image
        src={Notfound}
        alt="Not Found"
        width={250}
      />
    </div>
  );
}

export default LinkNotFound;