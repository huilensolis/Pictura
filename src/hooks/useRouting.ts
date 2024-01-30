import { useRouter } from "next/navigation"

export const useRouting = () => {
    const router = useRouter()
    
    const goTo = (url: string) =>{
        router.push(url)
    }

    return { goTo }
}