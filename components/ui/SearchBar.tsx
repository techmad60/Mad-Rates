import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="relative w-full bg-white mx-auto rounded-lg">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow text-gray-800"
      />
    </div>
  );
}
