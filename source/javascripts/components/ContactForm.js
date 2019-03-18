import React from "react";

function ContactForm(props) {
  return (
    <>
      <form id="beat-my-quote" name="wf-form-beat-my-quote"
            data-name="beat-my-quote" method="post" action="/thank-you"
            data-netlify="true" netlify-honeypot="bot-field"
            className="w-clearfix">
        <div className="div-tow-collumn">
          <div className="div-40 form">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
          </div>
          <div className="div-50-2 form">
            <div className="div-flex-h-2 no-min-height">
              <input type="text"
                     id="first-name"
                     name="first-name"
                     data-name="First Name"
                     placeholder="First Name"
                     maxLength="256"
                     className="text-field-2 bigger-field added-right-margin w-input"/>
              <input
                type="text" id="second-name" name="second-name"
                data-name="Second Name" placeholder="Second Name"
                maxLength="256" required=""
                className="text-field-2 bigger-field w-input"/>
            </div>
            <input type="email" id="email-2" name="email-2"
                   data-name="Email 2" required="" maxLength="256"
                   placeholder="Email Address"
                   className="text-field-2 bigger-field w-input"/>
            <input
              type="email" id="bot-field" name="bot-field"
              data-name="Bot Field"
              placeholder="Bot-field" maxLength="256"
              className="text-field-2 bigger-field bot-field w-input"/>
            <input
              type="text" id="Telephone" name="Telephone"
              data-name="Telephone"
              placeholder="Phone Number" maxLength="256" required=""
              className="text-field-2 bigger-field w-input"/>
            <textarea
              id="message-2" name="message-2" placeholder="Message"
              maxLength="5000" data-name="Message 2"
              className="textarea-2 w-input"></textarea>
          </div>
        </div>
        <div className="div-spacer-2"></div>
        <input type="submit" data-wait="Please wait..." value="SEND"
               className="submit final w-button"/>
      </form>
      <div className="w-form-done">
        <div>Thank you! Your submission has been received!</div>
      </div>
      <div className="w-form-fail">
        <div>Oops! Something went wrong while submitting the form</div>
      </div>
    </>
  )
}

export default ContactForm;