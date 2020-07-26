import React from 'react'

export const LinkDetails = (link) => {
console.log(link)
    return (
        <div>
            <h2>Details</h2>
            <p>Your link: <a href={link.link.to} target="_blank" rel="noopener noreferrer" >{link.link.to}</a></p>
            <p>From: <a href={link.link.from} target="_blank" rel="noopener noreferrer" >{link.link.from}</a></p>
            <p>Clicks: <strong>{link.link.clicks}</strong></p>
            <p>Date: <strong>{new Date(link.link.date).toLocaleDateString()}</strong></p>
        </div>

    )

}