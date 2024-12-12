import CreateUrlForm from "@/components/shared/createUrlForm";

export default function Home() {
  return (
    <main className="flex flex-col max-w-7xl justify-center items-center mx-auto h-[90vh]">
      <div className="flex flex-col">
        <h1 className="font-pacifico text-5xl lg:text-8xl text-center">
          Elegant
        </h1>
        <h1 className="font-caveat text-3xl lg:text-6xl text-end font-bold relative">
          URL
        </h1>
      </div>
      <p className="font-poppins text-center text-sm lg:text-xl mt-4 font-normal mb-12">
        Customize your URL to be short and stylish 😎✌️
      </p>
      <CreateUrlForm />
    </main>
  );
}
