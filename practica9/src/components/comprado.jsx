import { useEffect, useState } from "react";
import { listenForUserPurchases } from "../hooks/useFirebaseListener";
import Article from "./Article.astro";
import ArticleComprado from "./ArticleComprado";

const CourseWrapper = ({ usuarioId, article }) => {
  const [comprado, setComprado] = useState(Boolean(article.comprado));

  useEffect(() => {
    listenForUserPurchases(usuarioId, (compras) => {
      setComprado(Boolean(compras[article.slug]));
    });
  }, [article.slug, usuarioId]);

  return comprado ? <ArticleComprado {...article} /> : <Article {...article} />;
};

export default CourseWrapper;
