import Navbar from "../components/Navbar/Navbar";

export default function Home(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <h1 className="text-3xl font-bold">Welcome to the App</h1>
        <p className="mt-2 text-gray-600">Home page</p>
      </div>
    </div>
  );
}