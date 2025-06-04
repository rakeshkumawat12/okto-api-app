import logo from '../assets/icon.svg';

const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <img src={logo} className="w-10 h-10" />
        </div>
        {/* Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
          Okto React SDK Demo
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
