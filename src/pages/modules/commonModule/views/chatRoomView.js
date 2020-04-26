import React, { Component } from "react"
import { Divider, Spinner, Icon, Tag } from "@blueprintjs/core"
import { CHATLISTMEMBER, CHAT_HISTORY } from "./../../../graphql/queries"
import { Query } from "react-apollo"
import MessageBox from "../components/messageBox"
import { ApolloConsumer } from "react-apollo"
import UserImage from "../../../../images/default_profile_img.png"
import { connect } from "react-redux"
import NoMessageView from "./NoMessageView"
import LoadingMessageView from "./LoadingMessageView"
import Pusher from "pusher-js"
import pushid from "pushid"
import { PUSHER_KEY } from "gatsby-env-variables"

class ChatRoomView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      chatMember: null,
      ContactList: false,
      loading: false,
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

  messageFetched = async (client, id) => {
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
          loading: false,
        })
      }
    )
  }

  toggleContactList = () => {
    this.setState({
      ContactList: !this.state.ContactList,
    })
  }

  componentDidMount() {
    console.log(PUSHER_KEY)

    const pusher = new Pusher(PUSHER_KEY, {
      cluster: "mt1",
      encrypted: true,
    })

    const channel = pusher.subscribe("chat")

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("subscribed")
    })

    channel.bind("pusher:subscription_error", function(status) {
      console.log(status)
    })

    channel.bind("new-message", data => this.updateChat(data))
  }

  updateChat = data => {
    if (this.state.chatMember) {
      
      if (this.state.chatMember.id == data.message.sender_id) {
      } else {
        this.setState({
          [data.message.sender_id]: 1,
        })
      }
    }else{
      this.setState({
        [data.message.sender_id]: 1,
      })
    }

    if (this.state.chatMember) {
      if (
        parseInt(data.message.sender_id) ===
          parseInt(this.state.chatMember.id) &&
        parseInt(data.message.recipient_id) === parseInt(this.props.user.id)
      ) {
        this.props.popMessage(data.message)
        this.props.updatemessage(data.message)
      }
    }
  }

  componentWillUnmount() {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: "mt1",
      encrypted: true,
    })

    const channel = pusher.subscribe("chat")
    channel.unbind_all()
    pusher.disconnect()
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
                                    (this.state.chatMember &&
                                    this.state.chatMember.id === chatMember.id
                                      ? " selected-contact"
                                      : "")
                                  }
                                  onClick={() => {
                                    this.toggleContactList()
                                    this.setState({
                                      chatMember,
                                      loading: true,
                                      [chatMember.id]: null,
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
                                    <span>
                                      {chatMember.first_name +
                                        " " +
                                        chatMember.last_name}
                                    </span>
                                    {this.state[chatMember.id] ? (
                                      <Tag minimal={true}>New</Tag>
                                    ) : (
                                      <></>
                                    )}
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
function mapStateToProps(state) {
  return {
    user: state.loggedInUser,
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
    updatemessage: message => {
      dispatch({
        type: "ADD_NEW_MESSAGE",
        message,
      })
    },
    popMessage: message => {
      dispatch({
        type: "POP_MESSAGE",
        message,
      })
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomView)
