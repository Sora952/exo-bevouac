import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomizableTable from "../components/Table";
import Container from '@material-ui/core/Container';
import Map from '../components/Map';

interface DataModel {
    address: String,
    alternance: Boolean,
    boosted: Boolean,
    city: String,
    contact_mode: String,
    headcount_text: String,
    lat: number,
    lon: number,
    matched_rome_code: String,
    matched_rome_label: String,
    matched_rome_slug: String,
    naf: String,
    naf_text: String,
    name: String,
    siret: String,
    social_network: String,
    stars: number,
    url: number,
    website: String,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        textTypoLoad: {
            fontSize: '22px',
            fontWeight: 600,
            color: '#242424'
        },
        textTypoEndLoad: {
            fontSize: '22px',
            fontWeight: 600,
            color: '#242424',
            marginBottom: "30px"
        },
    }),
);

export default function Home() {
    const [token, setToken] = useState('')
    const [refreshTable, setRefreshTable] = useState(false);
    const [refreshToken, setRefreshToken] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [countData, setCountData] = useState(0);

    const updatePage = (nbPage: number) => {
        setPage(nbPage + 1);
    }

    useEffect(() => {
        if (refreshToken) {
            const url = "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire";
            const youCliendId = "Enter your secret client id HERE";
            const yourClientSecret = "Enter your secret client key HERE";

            //VVV Code from postman VVV
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Cookie", "BIGipServerVS_IW_PO002-VIPA-00PX20b_HTTPS.app~POOL_IW_PO002-00PX20b_HTTPS_SO007_SFPSN_13=!ibWQvKANZGG/UbC7J4e2VQ94kZbM8QVvEYaMhLJqXqpiEFy8/bkzOL6wcU6sbhyTjH3O36QMdHR/y/g=; TS0188135e=01b3abf0a2e577c11abfed94b52ab97316a11b88a2c09878fe9605d694c478539c49138bdc06a412d44e80dbbffbfa123bca20b4f959c2d889dd0f5552f17aac5996e73ea0");

            const urlencoded = new URLSearchParams();
            urlencoded.append("grant_type", "client_credentials");
            urlencoded.append("client_id", youCliendId);
            urlencoded.append("client_secret", yourClientSecret);
            urlencoded.append("scope", "api_labonneboitev1 application_PAR_exobevouac_60b51db582121f78567ff631281d245414112025c894f74e7b2c6216eee93781");

            fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            })
                .then(response => response.text())
                .then(result => {
                    setToken(JSON.parse(result).access_token)
                    setRefreshTable(true);
                    setRefreshToken(false);
                })
                .catch(error => console.error('error', error));
        }
    }, [refreshToken])

    useEffect(() => {

        if (refreshTable) {
            if (token !== '') {
                const url = `https://api.emploi-store.fr/partenaire/labonneboite/v1/company/?page_size=10&page=${page}&departments=91,92,93,94,95,13&rome_codes=M1805`
                axios.get(url,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        setCountData(response.data.companies_count)
                        response.data.companies.sort(function (a: DataModel, b: DataModel) {
                            const keyA = a.stars,
                                keyB = b.stars;
                            if (keyA < keyB) {
                                return 1
                            };
                            if (keyA > keyB) {
                                return -1
                            };
                            if (keyA === keyB) {
                                return 1
                            }
                            return 0
                        })
                        setData(response.data.companies)
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }, [refreshTable, page]) //eslint-disable-line

    return (
        <div>
            <div>
                <div>
                    {loading ?
                        <>
                            <Typography className={classes.textTypoLoad} variant="body1" gutterBottom>chargement en cours...</Typography>
                            <CircularProgress color="secondary" />
                        </>
                        :
                        <>
                            <Typography className={classes.textTypoEndLoad} variant="body1" gutterBottom>Résultat de l'appel :</Typography>
                            <Container maxWidth="xl">
                                <CustomizableTable countData={countData} updatePage={updatePage} dataTable={data} />
                            </Container>
                            <Map />
                        </>
                    }
                </div>
            </div>
            {/* <div className="immersion-widget" data-metier="coiffure" data-lieu="nantes-44" data-format="">test widget</div> */}
        </div>
    )
}
