import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/loader";
import {LinkDetails} from "../components/LinkDetails";

export const DetailedPage = () => {
    const [link, setLink] = useState(null)
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const linkId = useParams().id
    const getLink = useCallback(async () => {
        try {
const data = await request(`/api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${auth.token}`})
            setLink(data)
        } catch (e) {
        }
    }, [auth.token, request, linkId])

    useEffect(() => {
        getLink()

    },[getLink])

    if (loading) {
        return <Loader />
    }
    return (
        <div>
            {!loading && link && <LinkDetails link={link}/>}
        </div>
    )


}