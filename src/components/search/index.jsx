import React from 'react';
import { SearchContainer, IpuntSearch, InputLabel } from './styles';
import TextField from '@mui/material/TextField';


const Search = () => {
    return (
        <SearchContainer>
            <InputLabel>Digite o nome da linha do ônibus</InputLabel>
            <IpuntSearch>
                <TextField style={{ width: '90%' }} label="Pesquisar" variant="outlined" />
            </IpuntSearch>
        </SearchContainer>
    )

};

export default Search;