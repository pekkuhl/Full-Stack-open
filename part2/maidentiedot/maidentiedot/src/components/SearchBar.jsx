const SearchBar = ({onInputChange}) => {

    return (
        <div>
            find countries <input onChange={onInputChange}></input>
        </div>
    )
}

export default SearchBar