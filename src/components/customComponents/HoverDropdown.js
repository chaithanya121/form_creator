// HoverDropdown.js
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HoverDropdown = ({ options, onSelect, buttonLabel, placeholder }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option); // Call the onSelect callback
    setShowDropdown(false); // Close the dropdown after selection
  };

  const handleToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const renderOptions = () => {
    if (Array.isArray(options) && options.length > 0) {
      return options.map((option) => {
        const isObject = typeof option === 'object' && option !== null;
        const label = isObject ? option.label : option; // Check if option is an object
        const value = isObject ? option.value : option; // Use value if it's an object

        return (
          <Dropdown.Item 
            key={value} 
            onClick={() => handleSelect({ label, value })}
          >
            {label}
          </Dropdown.Item>
        );
      });
    } else {
      return <Dropdown.Item disabled>No options available</Dropdown.Item>;
    }
  };

  return (
    <Dropdown
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onToggle={handleToggle}
      show={showDropdown}
      style={{ display: 'inline-block' }}
    >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedOption ? selectedOption.label : buttonLabel}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {renderOptions()}
      </Dropdown.Menu>
    </Dropdown>
  );
};

// PropTypes for the component
HoverDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      }),
    ])
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  placeholder: PropTypes.string,
};

// Default props
HoverDropdown.defaultProps = {
  buttonLabel: "Select Option",
  placeholder: "No option selected",
};

export default HoverDropdown;
