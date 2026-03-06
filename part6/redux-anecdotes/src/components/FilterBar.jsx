import { useDispatch } from "react-redux"
import { filterText } from "../reducers/filterReducer"


const FilterBar = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(filterText((e.target.value).toLowerCase()))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <form>
        <label htmlFor=""> filter
        <input type="text" name="filter" onChange={handleChange}/>
        </label>
      </form>
    </div>
  )
}

export default FilterBar