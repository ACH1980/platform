import { useState, useEffect } from "react"
import { useSession } from "next-auth/client"
import Head from 'next/head'
import Header from "../components/Header";
import RequestFilter from "../components/RequestFilter";
import RequestCard from "../components/RequestCard";
import LoginGate from "../components/LoginGate";

export default function Requests() {
    const [session, loading] = useSession();
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/requests")
            const json = await res.json()
            if (json.content) {
                setContent(json.content)
            } else {
                setContent(json.error)
            }
        }
        fetchData();
    }, [session]);


    const filterRequests = () => {

    }

    return (
        <>
            <Head>
                <title>Wir Helfen</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href='https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900' rel="stylesheet" />
            </Head>
            <Header session={session} />
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mx-auto max-w-7xl px-4 sm:mt-12 sm: pt-10 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1">
                                {!session && (
                                    <LoginGate />
                                )}
                                {session && content && (
                                    <>
                                    <RequestFilter content={content}></RequestFilter>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 pb-20 ">
                                        {content.map((item) => {
                                            return (
                                                <RequestCard data={item}></RequestCard>
                                            )
                                        })}
                                    </div>
                                    </>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}