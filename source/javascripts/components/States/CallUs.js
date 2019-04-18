import React from "react";
import ContactForm from "../ContactForm";


class CallUs extends React.Component {

  render() {
    return (
      <ContactForm title={"Unsure about the system you need?"}
                   description={"Leave us a message and we'll call you to make sure you get\n" +
                   "the right unit for your home."}/>
    )
  }
}

export default CallUs;