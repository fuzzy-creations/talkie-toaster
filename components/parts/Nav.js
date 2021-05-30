import React from 'react';
import styles from '../../sass/parts/Nav.module.scss';

import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import WidgetsIcon from '@material-ui/icons/Widgets';
import StarIcon from '@material-ui/icons/Star';
import PublicIcon from '@material-ui/icons/Public';

import Tooltip from '@material-ui/core/Tooltip';


function Nav(props){
    return (
        <div className={styles.nav}>
        <ul className={styles.nav__list}>
            {/* <li className={styles.nav__list__item}>
                <Tooltip title={<p style={{ fontSize: "1.3rem" }}>About</p>}>
                    <SentimentSatisfiedAltIcon />
                </Tooltip>
            </li> */}
            <li className={styles.nav__list__item} onClick={() => props.navLinks(10)}>
                <Tooltip title={<p style={{ fontSize: "1.3rem" }}>Menu</p>}>
                    <WidgetsIcon />
                </Tooltip>
            </li>
            <li className={styles.nav__list__item} onClick={() => {
                    window.open('/highscores');
                }}>
                <Tooltip title={<p style={{ fontSize: "1.3rem" }}>Scores</p>}>
                    <StarIcon />
                </Tooltip>
            </li>
            {/* <li className={styles.nav__list__item}>
                <Tooltip title={<p style={{ fontSize: "1.3rem" }}>Covid</p>}>
                    <PublicIcon />
                </Tooltip>
            </li> */}
        </ul>
    </div>
    )
}

export default Nav;