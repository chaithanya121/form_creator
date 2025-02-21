import React, { useState } from "react";
import { Dropdown } from "primereact";
import { FaUserGraduate, FaBriefcase, FaRegUser } from "react-icons/fa"; // Importing icons
// import './CustomDropdown.css'; // Custom styles

const CustomDropdown = ({ options, placeholder, onChange,className }) => {
    const [selectedType, setSelectedType] = useState(null);

    const handleChange = (e) => {
        setSelectedType(e.value);
        onChange(e.value); // Callback to parent
    };

    const selectedTypeTemplate = (option) => {
        if (option) {
            return (
                <div className="custom-dropdown-selected">
                    {getIcon(option.type)} {/* Show icon based on type */}
                    <span>{option.name}</span>
                </div>
            );
        }
        return <span className="custom-dropdown-placeholder">{placeholder}</span>;
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Student':
                return <FaUserGraduate className="custom-dropdown-icon" />;
            case 'Non-IT':
                return <FaBriefcase className="custom-dropdown-icon" />;
            case 'Employee':
                return <FaRegUser className="custom-dropdown-icon" />;
            default:
                return null;
        }
    };

    const itemTemplate = (option) => {
        return (
            <div className="custom-login-dropdown-item">
                {getIcon(option.type)} {/* Show icon based on type */}
                <span style={{fontSize: '13px'}}>{option.name}</span>
            </div>
        );
    };

    return (
        <div className="custom-dropdown">
            <Dropdown
                value={selectedType}
                className={className}
                options={options}
                onChange={handleChange}
                optionLabel="name"
                placeholder={placeholder}
                valueTemplate={selectedTypeTemplate}
                itemTemplate={itemTemplate}
                panelClassName="custom-multiselect-panel"
            />
        </div>
    );
};

export default CustomDropdown;
