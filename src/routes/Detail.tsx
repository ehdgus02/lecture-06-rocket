import type { RocketType } from "./Home.tsx";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
    const { id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [rocket, setRocket] = useState<RocketType | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
            .then(res => res.json())
            .then((json: RocketType) => {
                setRocket(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>본문을 불러오는 중입니다...</div>;
    }

    if (!rocket) {
        return <div className={styles.loading}>존재하지 않는 게시글입니다.</div>;
    }
    return (
        <div className={styles.container}>
            <Link to={"/"} className={styles.backLink}>
                &larr; 목록으로 돌아가기
            </Link>

            <div className={styles.image}>
                {rocket.flickr_images[0] && (
                    <div className={styles.imageWrapper}>
                        <img
                            src={rocket.flickr_images[0]}
                            alt={rocket.name}
                            className={styles.rocketImage}
                        />
                    </div>
                ) }
            </div>



            <article className={styles.article}>
                <h1 className={styles.name}>{rocket.name}</h1>
                <div className={styles.body}>{rocket.description}</div>
                <div className={styles.meta}>
                    <span>FIRST FLIGHT : {rocket.first_flight}</span>
                    <span style={{ margin: "0 12px" }}>|</span>
                    <span>COMPANY : {rocket.company}</span>
                    <span style={{ margin: "0 12px" }}>|</span>
                    <span>ID : {rocket.id}</span>
                </div>
            </article>
        </div>
    );
}

export default Detail;
