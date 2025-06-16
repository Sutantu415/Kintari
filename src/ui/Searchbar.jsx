const Searchbar = ({ placeholder, value, onChange, onSubmit }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="w-2xl px-4">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full text-gray-600 font-semibold text-xl 
                           rounded-full border-2 border-green-400 shadow-md 
                           py-4 px-6 outline-none focus:ring-2 focus:ring-green-300 
                           placeholder-gray-400 bg-white"
            />
        </div>
    );
};

export default Searchbar;
