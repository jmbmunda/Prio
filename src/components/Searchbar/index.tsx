import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Searchbar = ({ value, onChange, placeholder = "Search", ...rest }: Props) => {
  return (
    <div>
      <input value={value} onChange={onChange} placeholder={placeholder} {...rest} />
    </div>
  );
};

export default Searchbar;
