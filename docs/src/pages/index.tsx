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
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {useRef} from "react";
import StartPanel from "@site/src/components/StartPanel/StartPanel";

export default function Home() {
  const homepageContentRef = useRef(null);
  return (
      <Layout description="Chat component for AI APIs">
        <Head>
          <html className="plugin-pages plugin-id-default homepage" />
        </Head>
        <main>
          <div id="homepage-content" ref={homepageContentRef} className="invisible-component">
            <StartPanel></StartPanel>
          </div>
        </main>
      </Layout>
  );
}
