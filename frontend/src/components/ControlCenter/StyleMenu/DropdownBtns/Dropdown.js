import React, {useEffect, useRef, useState} from 'react';
import "../../../../assets/css/ControlCenter/dropdown.css";
import DropButton from "./DropButton";
import DropdownList from "./DropdownList";


function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const drop = useRef(null);
    function handleClick(e) {
        if (drop.current !== null && !e.target.closest(`.${drop.current.className}`) && isOpen) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    })

    return (
        <div className="dropdown__wrapper" ref={drop}>
            <DropButton onClick={() => setIsOpen(isOpen => !isOpen)}/>
            {isOpen && <DropdownList />}
        </div>
    )
}

export default Dropdown;