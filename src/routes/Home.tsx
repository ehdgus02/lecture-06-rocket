import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router";

export type RocketType = {
    name: string;
    id: string;
    description: string;
    first_flight: string;
    company: string;
};

function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [rockets, setRockets] = useState<RocketType[]>([]);

    useEffect(() => {
        fetch("https://api.spacexdata.com/v4/rockets")
            .then(res => res.json())
            .then((json: RocketType[]) => {
                setRockets(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>데이터를 로딩중입니다...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>로켓 리스트</h1>
            <table className={styles.boardTable}>
                <thead>
                    <tr>
                        <th className={styles.idCell}>번호</th>
                        <th className={styles.titleCell}>이름</th>
                    </tr>
                </thead>
                <tbody>
                    {rockets.map((value, index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td className={styles.idCell}>{index + 1}</td>
                            <td className={styles.titleCell}>
                                <Link to={`/${value.id}`} className={styles.link}>
                                    {value.name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
