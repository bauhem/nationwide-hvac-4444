import React from "react";
import ContactForm from "./ContactForm";


class InvalidZip extends React.Component {
  render() {
    return (
      <ContactForm title={"Your zip code is not on our usual territory"}
                   description={"Leave us a message and we'll call you to make sure you get\n" +
                   "the right unit for your home."}/>
    )
  }
}

export default InvalidZip;