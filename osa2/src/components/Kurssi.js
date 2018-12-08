import React from 'react';

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko nimi = {kurssi.nimi} />
            <Sisalto osat = {kurssi.osat} />
            <Yhteensa osat = {kurssi.osat} />
        </div>
    )
}

const Yhteensa = ({osat}) => {
    return (
        <div>
            <p>
                yhteensä {osat.reduce(function(summa, osa) {return summa + osa.tehtavia},0)} tehtävää
            </p>
        </div>
    )
}

const Sisalto = ({osat}) => {
    return (
        <div>
            {osat.map(osa => <Osa key = {osa.id} osa = {osa}/>)}
        </div>
    )
}

const Osa = ({osa}) => {
    return (
        <div>
           <p> {osa.nimi} {osa.tehtavia} </p>
        </div>
    )
}


const Otsikko = ({nimi}) => {
    return (
        <div>
            <h2>{nimi}</h2>
        </div>
    )
}


export default Kurssi