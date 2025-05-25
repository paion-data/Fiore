/**
 * Copyright 2025 Jiaqi Liu. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import huggingFaceLogo from '/img/huggingFaceLogo.png';
import assemblyAILogo from '/img/assemblyAILogo.png';
import BrowserOnly from '@docusaurus/BrowserOnly';
import openAILogo from '/img/openAILogo.png';
import cohereLogo from '/img/cohereLogo.png';
import azureLogo from '/img/azureLogo.png';
import './StartPanel.css';
import ChatBrowser from "@site/src/components/ChatBrowser";
import StartPanelParticles from "@site/src/components/StartPanel/StartPanelParticles";
import {forwardRef, useRef} from "react";
import Translate from '@docusaurus/Translate';

const Logos = forwardRef((_, ref) => {
  return (
      <div
          id="start-panel-logos"
          className={'start-panel-not-visible start-panel-logos-left start-panel-logos-collapsed start-panel-logos-middle'}
          ref={ref}
      >
        <div className="start-panel-logo">
          <a href="docs/directConnection/HuggingFace" target="_blank">
            <img src={huggingFaceLogo} width="60" />
          </a>
        </div>
        <div className="start-panel-logo">
          <a href="docs/directConnection/OpenAI" target="_blank">
            <img src={openAILogo} width="40" style={{marginTop: '7px'}} />
          </a>
        </div>
        <div className="start-panel-logo">
          <a href="docs/directConnection/Cohere" target="_blank">
            <img src={cohereLogo} width="60" style={{marginTop: '1px'}} />
          </a>
        </div>
        <div className="start-panel-logo">
          <a href="docs/directConnection/Azure" target="_blank">
            <img src={azureLogo} width="42" style={{marginTop: '8px'}} />
          </a>
        </div>
        <div className="start-panel-logo">
          <a href="docs/directConnection/AssemblyAI" target="_blank">
            <img src={assemblyAILogo} width="35" style={{marginTop: '9px'}} />
          </a>
        </div>
      </div>
  );
});

function animate(component, logos, messageLine, messageBubble) {
  if (!component) return;
  component.classList.add('start-panel-component-left');
  logos.classList.add('start-panel-logos-right');
  messageLine.classList.add('message-line-long');
  setTimeout(() => {
    logos.classList.add('start-panel-logos-expanded');
    logos.classList.add('logos-top');
    messageBubble.classList.add('message-bubble-animation');
  }, 1500);
  setTimeout(() => {
    messageBubble.classList.add('displayed');
  }, 1000);
}

// this is to prevent a bug where upon opening up the homepage and the component takes a while to load - the logos would appear under it
function displayLogos(logos) {
  if (!logos) return;
  setTimeout(() => {
    logos.classList.add('start-panel-visible');
  }, 20);
}

function ComponentPanel() {
  const logos = useRef(null);
  const component = useRef(null);
  const messageBubble = useRef(null);
  const messageLine = useRef(null);
  setTimeout(() => displayLogos(logos.current), 350);
  setTimeout(() => animate(component.current, logos.current, messageLine.current, messageBubble.current), 1450);
  return (
      <div id="start-panel-animation-content-container">
        <div id="start-panel-component" ref={component} className={'start-panel-component-center'}>
          <ChatBrowser
              demo={true}
              history={[
                {text: 'What is Fiore?', role: 'user'},
                {text: 'An API agnostic chat webservice.', role: 'ai'},
                {text: 'What exactly can it be used for?', role: 'user'},
                {text: 'Deploy it as a webservice to connect to AI APIs.', role: 'ai'},
              ]}
              style={{
                borderRadius: '10px',
                boxShadow: '0 .5rem 1rem 0 rgba(44, 51, 73, .1)',
                border: '1px solid white',
                zIndex: 10,
              }}
              connect={{stream: true}}
          ></ChatBrowser>
        </div>
        <Logos ref={logos}></Logos>
        <div id="message-line" className={'message-line-short'} ref={messageLine}></div>
        <div id="message-bubble" className={'not-displayed'} ref={messageBubble}></div>
      </div>
  );
}

export function HeaderPanel() {
  return (
      <div>
        <h1 id="start-panel-header">
          Fiore
        </h1>
         <h1 id="start-panel-sub-header">
           <Translate>
             Framework agnostic chat component to power AI apps of tomorrow
           </Translate>
         </h1>
      </div>
  );
}

export default function StartPanel() {
  return (
      <BrowserOnly>
        {() => {
          return (
              <div id="start-panel">
                <StartPanelParticles></StartPanelParticles>
                <div id="start-panel-content">
                  <HeaderPanel></HeaderPanel>
                  <ComponentPanel></ComponentPanel>
                </div>
              </div>
          );
        }}
      </BrowserOnly>
  );
}
