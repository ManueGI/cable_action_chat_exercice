import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer";

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatroomId: Number }

  connect() {
    this.element.scrollTo(0, this.element.scrollHeight)
    this.channel = consumer.subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      {received: data => this._insertMessageAndScroll(data) }
    )
    console.log(`Subscribed to the chatroom with the id ${this.chatroomIdValue}.`)
  }

  _insertMessageAndScroll(data) {
    this.element.insertAdjacentHTML("beforeend", data)
    this.element.scrollTo(0, this.element.scrollHeight)
  }
}
