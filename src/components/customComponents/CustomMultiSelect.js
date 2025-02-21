

import React, { useState } from 'react';
import { MultiSelect } from 'primereact';

const CustomMultiSelect = ({ options, placeholder, showSelectAll, className, onChange }) => {
    const [selectedValues, setSelectedValues] = useState([]);

    // Generate options array from numeric values
    const extendedOptions = showSelectAll
        ? [{ label: 'Select All', value: 'SELECT_ALL' }, ...options.map(value => ({ label: `Option ${value}`, value }))]
        : options.map(value => ({ label: `Option ${value}`, value }));

    // Handle selection change
    const handleSelectChange = (e) => {
        const newSelectedValues = [...e.value];

        if (newSelectedValues.includes('SELECT_ALL')) {
            if (selectedValues.length === options.length) {
                // Clear the selection if all options are already selected
                setSelectedValues([]);
            } else {
                // Select all options
                setSelectedValues(options);
            }
        } else {
            // Remove 'Select All' and update individual selections
            setSelectedValues(newSelectedValues.filter(val => val !== 'SELECT_ALL'));
        }

        // Call the onChange prop with the new selected values and type
        if (onChange) {
            onChange(newSelectedValues);
        }
    };

    // Custom item template to render checkboxes with immediate state change
    const itemTemplate = (option) => {
        const isSelected = option.value === 'SELECT_ALL' ? selectedValues.length === options.length : selectedValues.includes(option.value);

        return (
            <div className="custom-multiselect-item" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    style={{    width: '15px',
                        height: '15px'}}
                    checked={isSelected}
                    onChange={() => {
                        let newSelectedValues;
                        if (option.value === 'SELECT_ALL') {
                            newSelectedValues = selectedValues.length === options.length ? [] : options;
                        } else {
                            newSelectedValues = isSelected
                                ? selectedValues.filter(val => val !== option.value)
                                : [...selectedValues, option.value];
                        }
                        setSelectedValues(newSelectedValues);

                        // Call the onChange prop with the updated selected values and type
                        if (onChange) {
                            onChange(newSelectedValues);
                        }
                    }}
                />
                <label style={{ marginLeft: '5px',fontSize:'12px',fontWeight:'bold' ,padding: '5px'}}>{option.label}</label>
            </div>
        );
    };

    return (
        <MultiSelect
            value={selectedValues}
            className={className}
            options={extendedOptions}
            onChange={handleSelectChange}
            optionLabel="label"
            panelClassName="custom-multiselect-panel"
            placeholder={placeholder}
            itemTemplate={itemTemplate} // Use the custom item template
            showClear={false} // Disable clear button
            display="chip" // Display selected values as chips
            panelHeaderTemplate={() => null} // Hide panel header
            panelFooterTemplate={() => null} // Hide panel footer
            maxSelectedLabels={1} // Show one label for selected values
        />
    );
};

export default CustomMultiSelect;
