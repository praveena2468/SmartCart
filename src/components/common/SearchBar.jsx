import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

export const SearchBar = ({ placeholder = "Search products, brands or categories..." }) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const [inputVal, setInputVal] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const mockSuggestions = [
    { title: 'Whole Wheat Atta', category: 'Foodgrains & Atta' },
    { title: 'Amul Milk & Dairy', category: 'Dairy & Bakery' },
    { title: 'Tata Tea Premium', category: 'Beverages' },
    { title: 'Surf Excel Detergent', category: 'Household Care' },
    { title: 'Britannia Good Day', category: 'Snacks & Munchies' },
    { title: 'Pure Cow Ghee', category: 'Foodgrains & Atta' }
  ];

  const filteredSuggestions = inputVal.trim()
    ? mockSuggestions.filter(s => s.title.toLowerCase().includes(inputVal.toLowerCase()) || s.category.toLowerCase().includes(inputVal.toLowerCase()))
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchQuery(inputVal.trim());
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  const handleSelectSuggestion = (item) => {
    setInputVal(item.title);
    setSearchQuery(item.title);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(item.title)}`);
  };

  return (
    <div ref={wrapperRef} className="position-relative w-100">
      <form onSubmit={handleSearchSubmit} className="input-group">
        <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0 border-end-0 shadow-none"
          placeholder={placeholder}
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <button
          className="btn btn-smartmart-primary rounded-end-pill px-4"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* Suggestion Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="position-absolute top-100 start-0 end-0 mt-1 bg-white border rounded-3 shadow-lg z-3 overflow-hidden">
          <div className="p-2 border-bottom bg-light text-muted small fw-bold">
            SUGGESTED SEARCHES
          </div>
          <ul className="list-group list-group-flush">
            {filteredSuggestions.map((item, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-2 px-3 cursor-pointer"
                onClick={() => handleSelectSuggestion(item)}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-arrow-up-right-circle text-muted"></i>
                  <span className="fw-semibold text-dark">{item.title}</span>
                </div>
                <span className="badge badge-smartmart-primary">{item.category}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
