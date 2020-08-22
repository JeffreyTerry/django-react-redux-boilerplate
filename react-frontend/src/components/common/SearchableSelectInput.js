import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getReactSelectTheme } from '../../assets/constants/constants';
import './SearchableSelectInput.scss';

const mapChoicesToInternalChoices = (choices, labelField, labelPrefix) => {
  return choices.map(choice => {
    return { value: choice, label: `${labelPrefix}${choice[labelField]}` };
  });
}

const mapValueToInternalValue = (choice, labelField) => {
  if (choice) {
    return { value: choice, label: choice[labelField] };
  } else {
    // Only a value of `null` re-renders the Select component -- for some
    // reason, setting the value to `undefined` doesn't trigger a re-render.
    return null;
  }
}

const SearchableSelectInput = ({ choices, value, onChange, disabled, labelPrefix = '', labelField = 'name' }) => {
  const [internalChoices, setInternalChoices] = useState(mapChoicesToInternalChoices(choices, labelField, labelPrefix));
  const [internalValue, setInternalValue] = useState(mapValueToInternalValue(choices.find(choice => choice === value), labelField));

  useEffect(() => {
    setInternalChoices(mapChoicesToInternalChoices(choices, labelField, labelPrefix));
  }, [choices, labelField, labelPrefix]);

  useEffect(() => {
    setInternalValue(mapValueToInternalValue(choices.find(choice => choice === value), labelField));
  }, [value, choices, labelField]);

  const handleOnChange = obj => {
    if (onChange) {
      onChange(obj?.value);
    }
  }

  return (
    <Select
      isClearable={true}
      isSearchable={true}
      onChange={handleOnChange}
      value={internalValue}
      options={internalChoices}
      name='generalSelect'
      className='general-select myapp-input'
      classNamePrefix='select'
      theme={getReactSelectTheme}
      isDisabled={disabled}
    />
  )
}

export default SearchableSelectInput;