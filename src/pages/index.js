import Layout from "@/layout/layout"
import Link from "next/link"
import { useState } from "react"
import { getSession, signOut, useSession } from "next-auth/react"
export default function App(){
    const { data: session } = useSession()
    return (
        <div>
            {session ? User({session}) : Guest()}
        </div>
    )
}

function Guest(){
    return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-4xl font-bold">Guest</h1>
            <div className="flex justify-center">
                <Link href={"/login"} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">Sign In</Link>
            </div>
        </div>
    )
}
function User({session}){
    return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-4xl font-bold">User</h1>

            <div className="details">
                <h5>{session.user.email}</h5>
                <h5>Unknown</h5>
            </div>
            <div className="flex justify-center">
                <button onClick={()=>{signOut()}} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">Sign Out</button>
            </div>
        </div>
    )
}
// export async function getServerSideProps({ req }){
//     const session = await getSession({ req })
//     if(!session){
//         return {
//             redirect: {
//                 destination: "/login",
//                 permanent: false
//             }
//         }
//     }
//     return {
//         props: {session}
//     }
// }