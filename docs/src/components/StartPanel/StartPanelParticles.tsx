/**
 * Copyright 2025 Paion Data. All rights reserved.
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
import {useColorMode} from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Particles from 'react-tsparticles';
import {useCallback} from 'react';
import {loadFull} from 'tsparticles';
import './StartPanelParticles.css';

// Particles throws error on navigatiion to another page - but I can't seem to be able to suppress it
export default function StartPanelParticles() {
  return (
      <BrowserOnly>
        {() => {
          const particlesInit = useCallback(async (engine) => {
            await loadFull(engine);
          }, []);
          const particlesLoaded = useCallback(async () => {}, []);
          const {colorMode} = useColorMode();
          return (
              <div id="start-panel-particles-container">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                      particles: {
                        number: {
                          value: 100,
                          density: {
                            enable: true,
                            value_area: 1000,
                          },
                        },
                        color: {
                          value: [colorMode === 'dark' ? '#656565' : '#7eccff'],
                        },
                        move: {
                          direction: 'none',
                          enable: true,
                          outModes: {
                            default: 'bounce',
                          },
                          random: false,
                          speed: 2,
                          straight: false,
                        },
                        shape: {
                          type: 'circle',
                          stroke: {
                            width: 0,
                            color: '#fff',
                          },
                          polygon: {
                            nb_sides: 5,
                          },
                        },
                        opacity: {
                          value: 0.6,
                          random: false,
                          anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                          },
                        },
                        size: {
                          value: 2,
                          random: true,
                          anim: {
                            enable: false,
                            speed: 0,
                            size_min: 0.1,
                            sync: false,
                          },
                        },
                        line_linked: {
                          enable: true,
                          distance: 120,
                          color: colorMode === 'dark' ? '#656565' : '#7eccff',
                          opacity: 0.4,
                          width: 1,
                        },
                      },
                      interactivity: {
                        detect_on: 'canvas',
                        events: {
                          onhover: {
                            enable: true,
                            mode: 'grab',
                          },
                          onclick: {
                            enable: false,
                          },
                          resize: true,
                        },
                        modes: {
                          grab: {
                            distance: 140,
                            line_linked: {
                              opacity: 1,
                            },
                          },
                          bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3,
                          },
                          repulse: {
                            distance: 200,
                            duration: 0.4,
                          },
                          push: {
                            particles_nb: 4,
                          },
                          remove: {
                            particles_nb: 2,
                          },
                        },
                      },
                      retina_detect: true,
                      fpsLimit: 120,
                    }}
                />
              </div>
          );
        }}
      </BrowserOnly>
  );
}
