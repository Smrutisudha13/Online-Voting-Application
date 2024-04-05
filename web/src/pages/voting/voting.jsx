import React from 'react';
import "./voting.css";

class SignupForm extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <form>
            <div className="form-group">
              <input type="email" name="email1" id="email1" placeholder="Client 1" />
              <button className="btn">VOTE</button>
            </div>

            <div className="form-group">
              <input type="password" name="psd" id="psd" placeholder="Client 2" />
              <button className="btn">VOTE</button>
            </div>

            <div className="form-group">
              <input type="password" name="cpswd" id="cpswd" placeholder="Client 3" />
              <button className="btn">VOTE</button>
            </div>

            <div className="form-group">
              <input type="email" name="email2" id="email2" placeholder="Client 4" />
              <button className="btn">VOTE</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupForm;
