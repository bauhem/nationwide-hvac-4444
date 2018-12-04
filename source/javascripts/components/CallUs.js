import React from "react";


class CallUs extends React.Component {

  render() {
    return (
      <div className="form w-form" data-ix="appear-from-bottom">
        <form id="wf-form-contact-form" name="contact-form"
              data-name="Contact Form"
              data-redirect="/thank-you">
          <input type="text"
                 className="text-field w-input"
                 maxLength="256" name="name"
                 data-name="Name"
                 placeholder="Enter your name"
                 id="name"/>
          <input type="email"
                 className="text-field w-input"
                 maxLength="256"
                 name="email"
                 data-name="Email"
                 placeholder="Enter your email"
                 id="email"
                 required=""/>
          <input
            type="text" className="text-field w-input" maxLength="256"
            name="Subject"
            data-name="Subject" placeholder="Enter the subject" id="Subject"
            required=""/>
          <textarea id="message" name="message"
                    placeholder="Enter your message here"
                    maxLength="5000" data-name="Message"
                    className="textarea w-input"></textarea>
          <input
            type="submit" value="Submit" data-wait="Please wait..."
            className="button w-button"/>
        </form>
        <div className="success-message w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div className="error-message w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
    )
  }

}

export default CallUs;