import React, {useState} from 'react';
import './ValidateData.css';
import {OldPlayIcon} from "../../ui/icons";
import {Input} from 'antd';

const {TextArea} = Input;

export default function ValidateData() {
  const [value, setValue] = useState('Kato and Roeser started feuding, resulting in Roeser leaving the band.')

  return (
      <div className="contribution">
        <div className="contribution-wrapper">
          <div className="cards-pill">
            <div/>
            <div className="cards-and-instruction">
              <div className="instruction hidden-sm-down" />
              <div className="cards">
                <div className="card">
                  <div className="card-dimension">
                    <div style={{margin: "auto", width: "100%"}}>
                      <TextArea

                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="&quot;Identified Text&quot;"
                          autoSize={{minRows: 3, maxRows: 5}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-listen">
            <div className="primary-button">
            <button className="listen" type="button">
              <OldPlayIcon/>
            </button>
            <div className="primary-button backgroundplay"/>
          </div>
          </div>
        </div>
      </div>

  )
}
