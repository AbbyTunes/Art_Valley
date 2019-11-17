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
      <div className="home-article-index-container">
        {divLine}
        <h2 className="home-header-text">Connect with us</h2>
        DATA SET 1 DATA SET 2 DATA SET 3 GIT HUBS BLAH BLAH
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
          {/* <div className="home-splash-image">
            <img src="https://cdn.theculturetrip.com/wp-content/uploads/2016/01/Golden-Dawn-Bridge-watercolor-%C2%A9-Nicolas-RaymondFlickr.jpg" />
            <p className="home-splash-carousel-legend">Legend 1</p>
          </div>
          <div className="home-splash-image">
            <img src="https://cdn.vox-cdn.com/thumbor/0OpaMlR5wdbpAHNHH-HVUVd8TRc=/0x0:1000x812/1200x800/filters:focal(664x399:824x559)/cdn.vox-cdn.com/uploads/chorus_image/image/63309864/shutterstock_1209873721.0.jpg" />
            <p className="home-splash-carousel-legend">Legend 2</p>
          </div> */}
          <div className="home-splash-image">
            <img src="https://ihg.scene7.com/is/image/ihg/kimpton-SF-Bay-Area-header" alt=""/>
            <p className="home-splash-carousel-legend">Bridge</p>
          </div>
        </Carousel>

        </div>
        <div className="home-container">
          {this.artHomeExamples()}
          {this.articleHomeExamples()}
          {this.developerInformation()}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
