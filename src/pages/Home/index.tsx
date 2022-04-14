import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { MainPage, PageArea } from "./styled";

export const Home = () => {
  const [listsAds, setListAds] = useState([]);

  useEffect(() => {
    const getAdsList = async () => {
      const request = await api.get("/ad/list", { params: {limit: 9, sort: 'aesd' }});
      const res = await request.data;
      setListAds(res.ads);
    };
    getAdsList();
  }, []);

  return (
    <>
      <Header></Header>
      <MainPage>
        <Categories />
        <PageArea>
          <h3>Anuncios recentes</h3>
          <div className="parent">
            {listsAds.map((item: any) => {
              return (
                <div>
                  <Link to={`/post-ad/${item.id}`}>
                    <img src={item.image} alt="" />
                    <p>{item.title}</p>
                    <b>{`R$ ${item.price}`}</b>
                  </Link>
                </div>
              );
            })}
          </div>
        </PageArea>
      </MainPage>
    </>
  );
};
