import React from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
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
    //   console.log("HELLO");

    //   console.log(this.props.art.id)
    //   debugger;
    //   console.log(this.props.art.id === this.props.match.params.artId)
    const art = cache.readQuery({
      query: FETCH_ART,
      variables: {
        artId: this.props.art.id
      }
    });
    console.log(art)
    console.log("art here ^^^^^^^")
    let newArt = merge({}, art);
    newArt.artById.title = this.state.title;
    console.log(newArt);
    console.log("newArt here ^^^^^^^");
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
                <input
                  value={this.state.title}
                  onChange={this.fieldUpdate("title")}
                />
                <button type="submit">Update Title</button>
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
