import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Queries from "../../graphql/queries";
import "./home.scss";
import Gallery from "react-grid-gallery";
import ArticleIndexItem from "../articles/ArticleIndexItem";


const { FETCH_ARTS_BY_CATEGORY, FETCH_ARTICLES } = Queries;
const divLine = (<div className="home-div-line" />);


class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  artHomeGallery() {
    return (
      <Query
        query={FETCH_ARTS_BY_CATEGORY}
        variables={{ categoryId: "5dc603aa4dc3a23d54cbb4fb" }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="art-index-container">
                <p>Loading...</p>
              </div>
            );
          if (error)
            return (
              <div className="home-article-index-container">
                <p>Error</p>
              </div>
            );


          const allArtList = data.artsByCategory.slice(0, 8).map(art => {
            return {
              src: art.photoLink,
              thumbnail: art.photoLink,
              thumbnailWidth: 420,
              thumbnailHeight: 320,
              // caption: art.title
              caption: art.title
            };
          });

          console.log(allArtList);

          

          return (
            // <div className="home-article-index-container">
            <div className="home-art-container">
              {divLine}
              <h2 className="home-header-text">Featured Art</h2>

              <Gallery
                images={allArtList}
                enableLightbox={true}
                maxRows={1}
                backdropClosesModal
                enableImageSelection={false}
                // currentImage={3}
                // isOpen={ true}
              />
            </div>
          );
        }}
      </Query>
    );
  }

  artHomeExamples() {
    return (
      <Query
        query={FETCH_ARTS_BY_CATEGORY}
        variables={{ categoryId: "5dc603aa4dc3a23d54cbb4fb" }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="art-index-container">
                <p>Loading...</p>
              </div>
            );
          if (error)
            return (
              <div className="home-article-index-container">
                <p>Error</p>
              </div>
            );

          let allArtList = data.artsByCategory.slice(0, 6).map(art => {
            return (
              <li key={art.id} className="home-article-example">
                <Link to={`/arts/${art.id}`}>
                  <img
                    className="home-article-example-thumb"
                    src={art.photoLink}
                    alt={art.title}
                  />
                </Link>
              </li>
            );
          });

          return (
            <div className="home-article-index-container">
              {divLine}
              <h2 className="home-header-text">Featured Art</h2>
              <div className="home-list">{allArtList}</div>
            </div>
          );
        }}
      </Query>
    );
  }

  articleHomeExamples() {
    return (
      <Query query={FETCH_ARTICLES}>
        {({ error, loading, data }) => {
          if (error)
            return (
              <div className="home-article-index-container">
                <p>Error</p>
              </div>
            );
          if (loading)
            return (
              <div className="home-article-index-container">
                <p>Loading...</p>
              </div>
            );
          let allArticleList = data.articles.slice(0, 3).map(article => {
            return (
              <li key={article.id} className="article-index-li">
                {/* <Link to={`/community/${article.id}`}>
                  <img
                    className="home-article-example-thumb"
                    src={article.photoLink}
                    alt={article.title}
                  />
                </Link> */}
                <Link to={`/community/${article.id}`}>
                  <ArticleIndexItem article={article} />
                </Link>
              </li>
            );
          });

          return (
            <div className="home-article-index-container">
              {divLine}
              <h2 className="home-header-text">Featured Articles</h2>
              <div className="article-index-list">{allArticleList}</div>
            </div>
          );
        }}
      </Query>
    );
  }

  developerInformation() {
    return (
      <div className="footer-container">
        <div className="footer-div-line" />
        <div className="footer">
          <h2 className="home-header-text">Connect with us</h2>
          <div className="git-links-container">
            <div className="git-links">
              <div>
                <img className="git-kit" src="http://localhost:3000/GitHub-Mark-32px.png"></img>
                <a href="https://github.com/AbbyTunes">Abby Xu</a>
              </div>
              <div>
                <img className="git-kit" src="http://localhost:3000/GitHub-Mark-32px.png"></img>
                <a href="https://github.com/cfo8473">Christopher Fong</a>
              </div>
              <div>
                <img className="git-kit" src="http://localhost:3000/GitHub-Mark-32px.png"></img>
                <a href="https://github.com/gbarrios212">Gabriel Barrios</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="home-total-container">
        <div className="home-splash-container">
          <Carousel
            className="home-splash"
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            swipeable={true}
            autoPlay={true}
            interval={5000}
            transitionTime={1000}
            swipeScrollTolerance={20}
            dynamicHeight={true}
          >
            <div className="home-splash-image">
              {/* <img src="https://i.imgur.com/CDFQxi8.jpg" /> */}
              {/* <img src="https://i.ytimg.com/vi/SiThJdF_VMo/maxresdefault.jpg" /> */}
              <img src="https://i.imgur.com/yEQJ83r.png"/>
              <p className="home-splash-carousel-legend">Discover talent in the Bay Area.</p>
            </div>
            <div className="home-splash-image">
              <img src="https://i.imgur.com/kXAJwZr.png"></img>
              {/* <img src="https://preview.redd.it/jqh7g7r1o00y.png?width=1024&auto=webp&s=f9cf60ff966efa8661cd954a6f25d19d614793d6" /> */}
              <p className="home-splash-carousel-legend">Share your work with like-minded peers.</p>
            </div>
            <div className="home-splash-image">
              <img src="https://i.imgur.com/IuO0mO8.png"></img>
              {/* <img src="https://external-preview.redd.it/5R5f1op4jygLaFHqhgBBlLWcdqiZEkjYZE97Fk1Gt9o.jpg?width=1024&auto=webp&s=eb16a26f648b0c4a20ffdb3e0405ceaf794d4887" alt=""/> */}
              <p className="home-splash-carousel-legend">Contribute to local criticism.</p>
            </div>
            {/* <div className="home-splash-image">
              <img
                src="https://ihg.scene7.com/is/image/ihg/kimpton-SF-Bay-Area-header"
                alt=""
              />
              <p className="home-splash-carousel-legend">gjladjdge</p>
            </div> */}
          </Carousel>
        </div>
        <div className="home-container">
          {this.artHomeExamples()}
          {this.articleHomeExamples()}
        </div>
        {this.developerInformation()}
      </div>
    );
  }
}

export default withRouter(Home);
