import React from 'react'
import {Link} from "react-router-dom";

export const LinkList = ({links}) => {
    console.log(links)

if (!links.length) {
    return <p className="center">No one link added yet</p>
}

    return (
        <div>
            <table className="striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Your link</th>
                    <th>From</th>
                    <th>Clicks</th>
                    <th>Date</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                { links.map( (link, i )=> {
                 return (   <tr key={link._id}>
                         <td>{i+1}</td>
                         <td>{link.to}</td>
                         <td>{link.from}</td>
                         <td>{link.clicks}</td>
                         <td>{new Date(link.date).toLocaleDateString()}</td>
                         <td>
                             <Link to={`/detail/${link._id}`}>Details</Link>
                         </td>

                    </tr>
                 )})}
                </tbody>
            </table>
        </div>
    )
}