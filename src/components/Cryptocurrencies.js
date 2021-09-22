import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import LoadingSpinner from "./spinner/LoadingSpinner";


const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {

        const filterData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))
        setCryptos(filterData)
    }, [cryptosList, search])
    if (isFetching) return <LoadingSpinner/>
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search cryptocurrency" onChange={(e) => setSearch(e.target.value)} />
                </div>

            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} alt='' />}
                                hoverable
                            >
                                <p>Price : {millify(currency.price)}</p>
                                <p>Market Cap : {millify(currency.marketCap)}</p>
                                <p>Daily Change : {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
