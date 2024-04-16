import React from "react";

interface FontSelectProps {
  applyFontSize: (newFontSize: number) => void; // Change the type of newFontSize to number
}

// FontSelect component in font-select.tsx
const FontSelect: React.FC<FontSelectProps> = ({ applyFontSize }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newFontSize = Number(event.target.value); // Convert the value to a number
    applyFontSize(newFontSize);
  };

  return (
    <select onChange={handleChange}>
      <option value="12">12</option>
      <option value="14">14</option>
      <option value="16">16</option>
      <option value="18">18</option>
      <option value="20">20</option>
      {/* Add more font size options as needed */}
    </select>
  );
};

export default FontSelect;