import React from "react";
import { Mutation } from "react-apollo";
import "./article_show.css"
// we added the "react-icons" library to have access to a pencil icon for editting
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
import TextareaAutosize from "react-textarea-autosize";
import Queries from "../../graphql/queries";
import { merge } from "lodash";
const { UPDATE_ARTICLE_BODY } = Mutations;
const { FETCH_ARTICLE } = Queries;

class ArticleBodyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      body: this.props.article.body || ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  // this is the function that will trigger "editing" mode
  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, data) {
    // update cache instead of setState
    const article = cache.readQuery({
      query: FETCH_ARTICLE,
      variables: {
        _id: this.props.article.id
      }
    });
    let newArticle = merge({}, article);
    newArticle.article.body = this.state.body;
    cache.writeQuery({
      query: FETCH_ARTICLE,
      data: newArticle,
      variables: {
        _id: this.props.article.id
      }
    });
  }

  render() {
    // if we are editing we'll return a Mutation component
    if (this.state.editing) {
      return (
        <Mutation
          mutation={UPDATE_ARTICLE_BODY}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(updateArticleBody, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateArticleBody({
                    variables: {
                      id: this.props.article.id,
                      body: this.state.body
                    }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <TextareaAutosize
                  className="article-show-body-edit"
                  value={this.state.body}
                  onChange={this.fieldUpdate("body")}
                />
                <button className="edit-info-button"type="submit">Update Body</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div onClick={this.handleEdit}>
            {this.props.article.body}
            <IconContext.Provider value={{ className: "custom-icon" }}>
              <FaPencilAlt />
            </IconContext.Provider>
          </div>
          <h2>{this.state.Titile}</h2>
        </div>
      );
    }
  }
}

export default ArticleBodyDetail;
