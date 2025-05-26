import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar por nombre o email..."
          aria-label="Buscar usuarios"
          className="search-bar-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>
    </div>
  );
};

export default SearchBar;
