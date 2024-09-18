import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import hospital from "@/app/assets/hospital.jpeg";
import doctor from "@/app/assets/doctor.jpeg";
const Showoff = () => {
  return (
    <section className="my-10">
      <MaxWidthWrapper>
        <div className="flex justify-center gap-4">
          <div className="flex flex-col gap-4 py-8 px-6  justify-center ">
            <Image
              src={doctor}
              width={120}
              height={20}
              alt={"loading doctor"}
            />
            <div>
              <h1 className="text-center text-primary">1000</h1>
              <p className=" font-semibold text-center md:text-left">Registered doctors</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-8 px-6  justify-center ">
            <Image
              src={hospital}
              width={120}
              height={20}
              alt={"loading hopital"}
            />
            <div>
              <h1 className="text-center text-primary ">100</h1>
              <p className="font-semibold text-center md:text-left">Registered hospitals</p>{" "}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Showoff;
