import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

const Pokemon = ({ data }) => {
    const router = useRouter()
    console.log(router)

    if (router.isFallback) {
        return <p>Cargando...</p>
    }

    return ( 
        <div>
            <h1>{data.name} Número #{data.id}</h1>
            <Image src={data.sprites.front_default} width={400} height={400}/>
            <Link href='/'>Volver a inicio</Link>
        </div>
    )
}

export default Pokemon


/*
export const getServerSideProps = async ({ params }) => {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }
}
*/


export const getStaticProps = async ({ params }) => {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }
} 

export const getStaticPaths = async () => {
    const paths = [
        { params: { id: '1' } },
        { params: { id: '2' } }
    ]
    return {
        paths,
        fallback: true,
    }
} 
/*
Hay 3 metodos
    1 fallback en falso, para cuando tengamos definidas todas las rutas que queramos 
    prerenderizar  y no tengan un volumen tan alto
    2 fallback en true, para cuando tengamos muchas paginas y queramos usar el feedback de cargando...
    3 fallback en 'blocking', para bloquear la interaccion y devolver el html al usuario una vez
    haya sido generado por next

*/