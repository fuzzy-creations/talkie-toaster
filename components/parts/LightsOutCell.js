import React from 'react'
import styles from "../../sass/parts/LightsOutCell.module.scss";

function LightsOutCell(props){
    console.log(props)

    function handleClick(event){
        props.flipCellsAroundMe();
    }
    return (
        <td className={`${styles.Cell} ${props.isLit ? styles.Cell__lit : null}`} onClick={handleClick} />
    )
}

export default LightsOutCell;
