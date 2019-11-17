import React from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import TextareaAutosize from "react-textarea-autosize";
import { merge } from "lodash";
const { UPDATE_ART_TITLE } = Mutations;
const { FETCH_ART } = Queries;

class ArtTitleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: this.props.art.title || ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, data) {
    const art = cache.readQuery({
      query: FETCH_ART,
      variables: {
        artId: this.props.art.id
      }
    });
    let newArt = merge({}, art);
    newArt.artById.title = this.state.title;
    cache.writeQuery({
      query: FETCH_ART,
      data: newArt,
      variables: {
        artId: this.props.art.id
      }
    });
  }

  render() {
    if (this.state.editing) {
      return (
        <Mutation
          mutation={UPDATE_ART_TITLE}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(updateArtTitle, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateArtTitle({
                    variables: {
                      id: this.props.art.id,
                      title: this.state.title
                    }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <TextareaAutosize
                  className="art-show-title-edit"
                  value={this.state.title}
                  onChange={this.fieldUpdate("title")}
                />
                <button className="edit-info-button" type="submit">
                  Update Title
                </button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div onClick={this.handleEdit}>
            {this.props.art.title}
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

export default withRouter(ArtTitleDetail);
