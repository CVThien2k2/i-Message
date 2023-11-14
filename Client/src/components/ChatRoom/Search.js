import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Tìm kiếm với:', searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Tìm kiếm người dùng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>Tìm kiếm</SearchButton>
    </SearchContainer>
  );
}
