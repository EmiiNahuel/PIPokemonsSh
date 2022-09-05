import React from "react";
import s from './Footer.module.css'
import github  from '../img/github.png'
import linkedin  from '../img/linkedin.png'



export default function Footer(){
    return (
        <div className={s.divOne}>
            <div className={s.derechos}>
                <p>By Emiliano Larrosa - 2022 - All rights reserved</p>
            </div>

            <div className={s.redes}>
                <a target='_blank' rel="noreferrer" href="https://github.com/EmiiNahuel">
                    <img src={github}  width='40px' height='40px' alt="" />
                </a>
                
                <a target='_blank' rel="noreferrer" href="https://linkedin.com/in/emilianoNahuelLarrosa">
                <img src={linkedin}  width='40px' height='40px' alt="" />
                </a>

            </div>

            <div className={s.btnArriba}>
                <p>Technologies: ReactJS-Javascript-PostgreSQL-Redux-Express-CSS-HTML</p>
            </div>
        </div>
    )
}