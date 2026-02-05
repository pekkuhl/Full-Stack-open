
const Persons = ({person, onHandleClick}) => {
    return (
        <div>
            <li>
                {person.name} {person.number}
                <button onClick={onHandleClick} >Remove</button>
                </li>
        </div>
    )
}


export default Persons