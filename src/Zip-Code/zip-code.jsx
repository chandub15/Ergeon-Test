import { useState } from "react";
import "./zip-code.scss";
export default function ZipCode() {
  const [autoComplete, setAutoComplete] = useState(true);
  const [error, setError] = useState(false);

  const handleOnKeyUp = (event) => {
    let zipCode = event.target.value;
    if (zipCode.length > 0) {
      if (isNaN(zipCode)) {
        setError(true);
        alert("Please enter digits only");
      } else {
        setError(false);
      }
    }
  };
  return (
    <div className="zip-code">
      <div className="title">Zip-Code</div>
      <div className="autocomplete-checkbox">
        <input type="checkbox" id="auto-complete" name="auto-complete" checked={autoComplete} onChange={(e) => setAutoComplete(!autoComplete)} />
        <label htmlFor="auto-complete">AutoComplete</label>
      </div>
      <form id="zip-code" className="zip-code-form">
        <input id="zip" className={`zip-code-input ${error ? `error` : ``}`} name="zip" type="number" pattern="[0-9]*" autoComplete={autoComplete ? `on` : `off`} placeholder="Enter Zip Code" onKeyUp={(e) => handleOnKeyUp(e)} />
        <input className="submit-button" type="submit" value="Submit" disabled={error} />
      </form>
    </div>
  );
}
