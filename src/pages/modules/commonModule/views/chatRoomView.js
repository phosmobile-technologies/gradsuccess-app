import React, { Component } from "react"
import { Divider, Spinner, Icon } from "@blueprintjs/core"
import { CHATLISTMEMBER, CHAT_HISTORY } from "./../../../graphql/queries"
import { Query } from "react-apollo"
import MessageBox from "../components/messageBox"
import { ApolloConsumer } from "react-apollo"
import UserImage from "../../../../images/default_profile_img.png"
import { connect } from "react-redux"
import NoMessageView from "./NoMessageView"
import LoadingMessageView from "./LoadingMessageView"


class ChatRoomView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      chatMember: null,
      ContactList: false,
      loading:false
    }
  }

  compare(a, b) {
    const bandA = a.created_at
    const bandB = b.created_at

    let comparison = 0
    if (bandA > bandB) {
      comparison = 1
    } else if (bandA < bandB) {
      comparison = -1
    }
    return comparison
  }

  messageFetched = async  (client,id) => {
    
    const { data } = await client.query({
      query: CHAT_HISTORY,
      variables: {
        sender_id: this.props.user_id,
        recipient_id: id,
      },
      fetchPolicy: "no-cache",
    })

    var seMessages = data.getSeMessages
    var reMessages = data.getReMessages
    this.setState(
      {
        messages: [],
      },
      () => {
        let chats = this.state.messages.concat(seMessages, reMessages)
        this.props.saveChatHistory(chats.sort(this.compare))


        this.setState({
          loading:false
        })
      }
    )
  }

  toggleContactList = () => {
    this.setState({
      ContactList: !this.state.ContactList,
    })
  }


  render() {
    if (this.props.chatList) {
      return (
        <div className="center">
          <div
            className={
              " contacts " + (this.state.ContactList ? " h-contacts" : "")
            }
          >
            <h2>Contacts</h2>
            <Divider />

            {this.props.chatList.map((id, key) => {
              return (
                <Query
                  query={CHATLISTMEMBER}
                  variables={{
                    id: id,
                  }}
                  key={key}
                >
                  {({ loading, error, data }) => {
                    var chatMember = data.getChatListMember
                    if (loading)
                      return (
                        <div>
                          <div className="loading-member-list">
                            <Spinner size={Spinner.SIZE_SMALL} />
                          </div>
                        </div>
                      )
                    if (error) return <div>Failed to load data</div>
                    return (
                      <ApolloConsumer>
                        {client => {
                          return (
                            <div>
                              {chatMember && (
                                <div
                                  className={
                                    " contact c-sb" +
                                    (this.state.chatMember && this.state.chatMember
                                      .id === chatMember.id
                                      ? " selected-contact"
                                      : "")
                                  }
                                  onClick={() => {
                                    this.toggleContactList()
                                    this.setState({
                                      chatMember,
                                      loading: true,
                                    })

                                    this.messageFetched(client, id)
                                  }}
                                >
                                  <div className="pic">
                                    {chatMember.details ? (
                                      <img
                                        src={
                                          chatMember.details.profile_image_ref
                                        }
                                        alt={
                                          chatMember.first_name +
                                          " " +
                                          chatMember.last_name
                                        }
                                      />
                                    ) : (
                                      <img
                                        src={UserImage}
                                        alt="Default profile"
                                      />
                                    )}
                                  </div>
                                  <div className="name">
                                    {chatMember.first_name +
                                      " " +
                                      chatMember.last_name}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        }}
                      </ApolloConsumer>
                    )
                  }}
                </Query>
              )
            })}
          </div>
          {this.state.loading ? (
            <LoadingMessageView
              chatMember={this.state.chatMember}
            ></LoadingMessageView>
          ) : (
            <>
              {this.state.chatMember ? (
                <>
                  <div
                    className="contacts-menu"
                    onClick={this.toggleContactList}
                  >
                    <span>Contacts</span>
                    <Icon
                      icon="menu"
                      iconSize={20}
                      color="black"
                      className="chat-contact-menu"
                      onClick={this.toggleMenu}
                    />
                  </div>
                  <MessageBox chatMember={this.state.chatMember} />
                </>
              ) : (
                <>
                  <div
                    className="contacts-menu"
                    onClick={this.toggleContactList}
                  >
                    <span>Contacts</span>
                    <Icon
                      icon="menu"
                      iconSize={20}
                      color="black"
                      className="chat-contact-menu"
                      onClick={this.toggleMenu}
                    />
                  </div>
                  <NoMessageView />
                </>
              )}
            </>
          )}
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveChatHistory: chats => {
      dispatch({
        type: "SAVE_CHAT_HISTORY",
        chats,
      })
    },
  }
}
export default connect(
  null,
  mapDispatchToProps
)(ChatRoomView)
