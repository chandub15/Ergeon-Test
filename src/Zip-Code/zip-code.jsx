import { useState } from "react";
import "./zip-code.scss";
export default function ZipCode() {
  const [autoComplete,setAutoComplete]=useState(true)


  return (
    <div className="zip-code">
      <div className="title">Zip-Code</div>
      <div className="autocomplete-checkbox">
      <input type="checkbox" id="auto-complete" name="auto-complete" checked={autoComplete} onChange={(e)=>setAutoComplete(!autoComplete)}/>
      <label for="auto-complete">AutoComplete</label>
      </div>
      <form id="zip-code" className="zip-code-form">
        <input id="zip" className="zip-code-input" name="zip" type="number" pattern="[0-9]*" autoComplete={autoComplete?`on`:`off`} placeholder="Enter Zip Code" />
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    </div>
  );
}
