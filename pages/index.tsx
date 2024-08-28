import {CustomNextPage} from "@/@types/next";
import {ApplicationLayoutsMapping} from "@/settings/config/layout.config";

const Home: CustomNextPage = () => {
    return (
        <>home</>
    );
}
Home.layout = ApplicationLayoutsMapping.app

export default Home
