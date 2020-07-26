import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/loader";
import {LinkList} from "../components/LinkList";

export const LinkPage = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)

    const getLinks = useCallback(async () => {
        try {
const data = await  request('/api/link', 'GET', null , { Authorization: `Bearer ${auth.token}`})
            setLinks(data)
        } catch (e) {
        }
    }, [request, auth.token])

    useEffect(() => {
        getLinks()

    },[getLinks])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {!loading && <LinkList links={links} />}
        </div>
    )


}