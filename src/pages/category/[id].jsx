import { useRouter } from "next/router";

const categoryId = () => {
    const router = useRouter();

    const { id } = router.query;
    return (
        <div>
            <h1>Category ID: {id}</h1>
        </div>
    );
}

export default categoryId;